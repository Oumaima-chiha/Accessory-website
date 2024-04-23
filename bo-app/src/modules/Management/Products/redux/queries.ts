import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from 'app/api';
import config from 'config/app_config';
import type { IPaginationPayload } from 'interfaces';
import type { IBOUser, Jewelry } from 'models';
import type { ProductsFiltersPayload } from '../interfaces/filters';
import type { IReduxJewelry } from '../interfaces/product';

const reducerPath = 'productsApi';
export const productApi = createApi({
  reducerPath,
  baseQuery: customFetchBase,
  tagTypes: ['Products'],
  endpoints: builder => ({
    getProducts: builder.query<
      // IPaginationResponse<Jewelry>,
      Jewelry[],
      IPaginationPayload & ProductsFiltersPayload
    >({
      query: ({
        page = 1,
        size = config.defaultPaginationSize,
        ...params
      }) => ({
        url: '/jewelry/all',
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
    updateJewelry: builder.mutation<{success:boolean, jewelry:Jewelry}, IReduxJewelry.UpdateJewelryPayload>({
      query: body => ({
        url: `/jewelry/${body?.id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteBoUser: builder.mutation<Jewelry, Pick<Jewelry, 'id'>>({
      query: body => ({
        url: `/jewelry/${body?.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  // useGetProductsQuery,
  useLazyGetProductsQuery,
  useAddJewelryMutation,
  useUpdateJewelryMutation,
  useDeleteBoUserMutation,
} = productApi;

export const productApiReducer = { [reducerPath]: productApi.reducer };
