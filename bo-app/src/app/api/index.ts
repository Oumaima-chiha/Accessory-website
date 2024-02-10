import type { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StorageKeys } from 'common';
import type { IRootState } from 'app/store';
import { Mutex } from 'async-mutex';
import CreateOutsideToast from 'components/Toast/Toast';
import i18n from 'config/i18n';
import { ToastStatus } from 'interfaces';
import type { IReduxAuth } from 'modules/Authentication/interfaces/auth';
import { logout } from 'modules/Authentication/redux';

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(StorageKeys.TOKEN) ?? null;
  }
  return null;
};

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.API_URL,
  credentials: 'same-origin',
  prepareHeaders: (headers, { endpoint }) => {
    const userToken = getToken();
    if (userToken && endpoint !== 'refresh') {
      headers.set('Authorization', `Bearer ${userToken}`);
    }

    return headers;
  },
});

const mutex = new Mutex();

const skippedEndpoints = ['login', 'updateNotification', 'deleteNotification'];

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (skippedEndpoints?.includes(api.endpoint)) {
      CreateOutsideToast({
        description: result?.error?.data?.['message'],
        title:
          result?.error?.data?.['error'] ?? i18n.t('errors:error_occurred'),
        status: ToastStatus.ERROR,
      });
      return result;
    }
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const appState = api.getState() as IRootState;
        const refreshResult = await baseQuery(
          {
            credentials: 'same-origin',
            url: 'bo-auth/refresh',
            method: 'POST',
            body: {
              refreshToken: appState?.auth?.refreshToken,
            },
          },
          api,
          extraOptions,
        );

        const loginResponse = refreshResult?.data as IReduxAuth.LoginResponse;

        if (loginResponse) {
          // Retry the initial query
          localStorage.setItem(
            SharedStorageKeys.TOKEN,
            loginResponse?.accessToken,
          );
          result = await baseQuery(args, api, extraOptions);
        } else {
          CreateOutsideToast({
            description: i18n.t('errors:unauthorized.description'),
            title: i18n.t('errors:unauthorized.title'),
            status: ToastStatus.ERROR,
          });
          setTimeout(() => api.dispatch(logout()), 2000);
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
export default customFetchBase;
