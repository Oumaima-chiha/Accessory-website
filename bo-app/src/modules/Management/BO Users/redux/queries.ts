import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from 'app/api';
import config from 'config/app_config';
import type { IPaginationPayload, IPaginationResponse } from 'interfaces';
import { ExcelFileNames } from 'interfaces/enums/excelFileNames';
import type { IBOUser } from 'models';
import { downloadFile } from 'utils/functions';
import type { BOUserFiltersPayload } from '../interfaces/filters';
import type { IReduxUser } from '../interfaces/user';

const reducerPath = 'boUsersApi';
export const boUsersApi = createApi({
  reducerPath,
  baseQuery: customFetchBase,
  tagTypes: ['BOUsers'],
  endpoints: builder => ({
    exportData: builder.mutation<Blob, void>({
      query: () => ({
        url: '/bo-users/export-excel',
        method: 'POST',
        responseHandler: async (
          response,
        ): Promise<Response | Record<string, any>> => {
          if (response.ok) {
            const blob = await response.blob();
            downloadFile(blob, ExcelFileNames.BO_USERS);
            return { data: response?.status };
          }
          const result = await response.json();
          return result;
        },
        cache: 'no-cache',
      }),
    }),
    getBoUsers: builder.query<
      IPaginationResponse<IBOUser>,
      IPaginationPayload & BOUserFiltersPayload
    >({
      query: ({
        page = 1,
        size = config.defaultPaginationSize,
        ...params
      }) => ({
        url: '/bo-users',
        method: 'GET',
        params: {
          page,
          size,
          ...params,
        },
      }),
      providesTags: () => [{ type: 'BOUsers' }],
    }),
    addBoUser: builder.mutation<IBOUser, IReduxUser.CreateUserPayload>({
      query: body => ({
        url: '/bo-users',
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [{ type: 'BOUsers' }],
    }),
    updateBoUser: builder.mutation<IBOUser, IReduxUser.UpdateUserPayload>({
      query: body => ({
        url: `/bo-users/${body?.id}`,
        method: 'PATCH',
        body,
      }),
    }),
    updateBoUserPassword: builder.mutation<
      IBOUser,
      Pick<IReduxUser.UpdateUserPayload, 'id' | 'password'>
    >({
      query: body => ({
        url: `/bo-users/${body?.id}/password`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteBoUser: builder.mutation<IBOUser, Pick<IBOUser, 'id'>>({
      query: body => ({
        url: `/bo-users/${body?.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetBoUsersQuery,
  useLazyGetBoUsersQuery,
  useAddBoUserMutation,
  useUpdateBoUserMutation,
  useUpdateBoUserPasswordMutation,
  useDeleteBoUserMutation,
  useExportDataMutation,
} = boUsersApi;

export const boUsersQueryReducer = { [reducerPath]: boUsersApi.reducer };
