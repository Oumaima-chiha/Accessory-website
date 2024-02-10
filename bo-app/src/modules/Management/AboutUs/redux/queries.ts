import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from 'app/api';
import config from 'config/app_config';
import type {
  ContentApproval,
  IPaginationPayload,
  IPaginationResponse,
} from 'interfaces';
import type {
  AboutUsFiltersPayload,
  IAboutUs,
  IReduxAboutUs,
} from '../interfaces';

const reducerPath = 'aboutUsApi';
export const aboutUsAPI = createApi({
  reducerPath,
  baseQuery: customFetchBase,
  tagTypes: ['AboutUs'],
  endpoints: builder => ({
    getAboutUs: builder.query<
      IPaginationResponse<IAboutUs>,
      IPaginationPayload & AboutUsFiltersPayload
    >({
      query: ({
        page = 1,
        size = config.defaultPaginationSize,
        ...params
      }) => ({
        url: 'bo-about-us',
        method: 'GET',
        params: {
          page,
          size,
          ...params,
        },
      }),
      providesTags: () => [{ type: 'AboutUs' }],
    }),
    addAboutUs: builder.mutation<IAboutUs, IReduxAboutUs.CreateAboutUsPayload>({
      query: body => ({
        url: 'bo-about-us/',
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [{ type: 'AboutUs' }],
    }),
    updateAboutUs: builder.mutation<
      IAboutUs,
      IReduxAboutUs.UpdateAboutUsPayload
    >({
      query: body => ({
        url: `bo-about-us/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: () => [{ type: 'AboutUs' }],
    }),
    deleteAboutUs: builder.mutation<IAboutUs, Pick<IAboutUs, 'id'>>({
      query: body => ({
        url: `bo-about-us/${body?.id}`,
        method: 'DELETE',
      }),
    }),
    approveDisapproveAboutUs: builder.mutation<IAboutUs, ContentApproval>({
      query: ({ type, payload }) => ({
        url: `/bo-about-us/${payload?.id}/${type}`,
        method: 'PATCH',
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetAboutUsQuery,
  useLazyGetAboutUsQuery,
  useAddAboutUsMutation,
  useUpdateAboutUsMutation,
  useDeleteAboutUsMutation,
  useApproveDisapproveAboutUsMutation,
} = aboutUsAPI;

export const aboutUsQueryReducer = { [reducerPath]: aboutUsAPI.reducer };
