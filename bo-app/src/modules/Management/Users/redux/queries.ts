import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from 'app/api';
import config from 'config/app_config';
import type { IPaginationPayload, IPaginationResponse } from 'interfaces';
import { ExcelFileNames } from 'interfaces/enums/excelFileNames';
import type { IUser } from 'models';
import { downloadFile } from 'utils/functions';
import type { EndUserFiltersPayload } from '../interfaces/filters';
import type { IReduxUser } from '../interfaces/user';

const reducerPath = 'usersApi';
const usersEndpoint = '/bo-end-users';
export const usersAPI = createApi({
  reducerPath,
  baseQuery: customFetchBase,
  endpoints: builder => ({
    exportData: builder.mutation<Blob, void>({
      query: () => ({
        url: `${usersEndpoint}/export-excel`,
        method: 'POST',
        responseHandler: async (
          response,
        ): Promise<Response | Record<string, any>> => {
          if (response.ok) {
            const blob = await response.blob();
            downloadFile(blob, ExcelFileNames.END_USERS);
            return { data: response?.status };
          }
          const result = await response.json();
          return result;
        },
        cache: 'no-cache',
      }),
    }),
    getUsers: builder.query<
      IUser[],
      IPaginationPayload & EndUserFiltersPayload
    >({
      query: ({
        page = 1,
        size = config.defaultPaginationSize,
        ...params
      }) => ({
        url: '/customers/all',
        method: 'GET',
        params: {
          page,
          size,
          ...params,
        },
      }),
    }),
    banUser: builder.mutation<IUser, IReduxUser.UpdateUserPayload>({
      query: body => ({
        url: `customers/${body?.isBanned?"unban":"ban"}/${body?.id}`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useExportDataMutation,
  useBanUserMutation,
} = usersAPI;

export const usersQueryReducer = { [reducerPath]: usersAPI.reducer };
