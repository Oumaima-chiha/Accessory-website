import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from 'app/api';
import type { IBOUser } from 'models';

import type { IReduxAuth } from '../interfaces/auth';

const reducerPath = 'authApi';
export const authAPI = createApi({
  reducerPath,
  baseQuery: customFetchBase,
  endpoints: builder => ({
    login: builder.mutation<IReduxAuth.LoginResponse, IReduxAuth.LoginPayload>({
      query: body => ({
        url: '/bo-auth/',
        method: 'POST',
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(authAPI.endpoints.getProfile.initiate());
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getProfile: builder.query<IBOUser, void>({
      query: () => ({
        url: '/bo-users/profile',
        method: 'GET',
      }),
    }),
    updatePassword: builder.mutation<IBOUser, IReduxAuth.ChangePasswordPayload>(
      {
        query: body => ({
          url: '/bo-users/profile',
          method: 'PATCH',
          body,
        }),
      },
    ),
  }),
});

export const {
  useLoginMutation,
  useLazyGetProfileQuery,
  useUpdatePasswordMutation,
} = authAPI;
export const authQueryReducer = { [reducerPath]: authAPI.reducer };
