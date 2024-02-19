import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from 'app/api';
import config from 'config/app_config';
import type { IPaginationPayload, IPaginationResponse } from 'interfaces';
import { ExcelFileNames } from 'interfaces/enums/excelFileNames';
import type { IBOUser } from 'models';
import { downloadFile } from 'utils/functions';
import type { BOUserFiltersPayload } from '../interfaces/filters';
import type { IReduxUser } from '../interfaces/user';
import { Jewelry } from 'models';
import { IReduxJewelry } from '../interfaces/product';

const reducerPath = 'boUsersApi';
export const boUsersApi = createApi({
  reducerPath,
  baseQuery: customFetchBase,
  tagTypes: ['Products'],
  endpoints: builder => ({
    getProducts: builder.query<
      IPaginationResponse<IBOUser>,
      IPaginationPayload & BOUserFiltersPayload
    >({
      query: ({
        page = 1,
        size = config.defaultPaginationSize,
        ...params
      }) => ({
        url: '/jewelry',
        method: 'GET',
        params: {
          page,
          size,
          ...params,
        },
      }),
      providesTags: () => [{ type: 'Products' }],
    }),
    addJewelry: builder.mutation<Jewelry, IReduxJewelry.CreateJewelryPayload>({
      query: body => ({
        url: '/jewelry',
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [{ type: 'Products' }],
    }),
    updateJewelry: builder.mutation<IBOUser, IReduxJewelry.UpdateJewelryPayload>({
      query: body => ({
        url: `/jewelry/${body?.id}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteBoUser: builder.mutation<IBOUser, Pick<IBOUser, 'id'>>({
      query: body => ({
        url: `/jewelry/${body?.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useAddJewelryMutation,
  useUpdateJewelryMutation,
  useDeleteBoUserMutation,
} = boUsersApi;

export const boUsersQueryReducer = { [reducerPath]: boUsersApi.reducer };
