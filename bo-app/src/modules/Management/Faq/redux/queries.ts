import { createApi } from '@reduxjs/toolkit/query/react';
import http from 'app/api';
import config from 'config/app_config';
import type {
  ContentApproval,
  IPaginationPayload,
  IPaginationResponse,
} from 'interfaces';
import type {
  FAQCategoryFiltersPayload,
  FAQFiltersPayload,
  IFaq,
  IFaqCategory,
  IReduxFAQ,
} from '../interfaces';

const reducerPath = 'faqApi';
export const faqAPI = createApi({
  reducerPath,
  baseQuery: http,
  tagTypes: ['FAQs'],
  endpoints: builder => ({
    getFAQs: builder.query<
      IPaginationResponse<IFaq>,
      IPaginationPayload & FAQFiltersPayload
    >({
      query: ({
        page = 1,
        size = config.defaultPaginationSize,
        ...params
      }) => ({
        url: '/bo-faq',
        method: 'GET',
        params: {
          page,
          size,
          ...params,
        },
      }),
      providesTags: () => [{ type: 'FAQs' }],
    }),
    addFAQ: builder.mutation<IFaq, IReduxFAQ.CreateFAQPayload>({
      query: body => ({
        url: '/bo-faq/',
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [{ type: 'FAQs' }],
    }),
    updateFAQ: builder.mutation<IFaq, IReduxFAQ.UpdateFAQPayload>({
      query: body => ({
        url: `/bo-faq/${body.id}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteFAQ: builder.mutation<IFaq, Pick<IFaq, 'id'>>({
      query: body => ({
        url: `/bo-faq/${body?.id}`,
        method: 'DELETE',
      }),
    }),
    approveDisapproveFAQ: builder.mutation<IFaq, ContentApproval>({
      query: ({ type, payload }) => ({
        url: `/bo-faq/${payload?.id}/${type}`,
        method: 'PATCH',
        body: payload,
      }),
    }),
    //? FAQ Categories Queries
    getFAQCategories: builder.query<
      IPaginationResponse<IFaqCategory>,
      IPaginationPayload & FAQCategoryFiltersPayload
    >({
      query: ({
        page = 1,
        size = config.defaultPaginationSize,
        ...params
      }) => ({
        url: '/bo-faq-category',
        method: 'GET',
        params: {
          page,
          size,
          ...params,
        },
      }),
      providesTags: () => [{ type: 'FAQs' }],
    }),
    getAllFAQCategories: builder.query<IFaqCategory[], void>({
      query: () => ({
        url: '/bo-faq-category/unpaged',
        method: 'GET',
      }),
    }),
    addFAQCategory: builder.mutation<
      IFaqCategory,
      IReduxFAQ.CreateFAQCategoryPayload
    >({
      query: body => ({
        url: '/bo-faq-category',
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [{ type: 'FAQs' }],
    }),
    updateFAQCategory: builder.mutation<
      IFaqCategory,
      IReduxFAQ.UpdateFAQCategoryPayload
    >({
      query: body => ({
        url: `/bo-faq-category/${body.id}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteFAQCategory: builder.mutation<IFaqCategory, Pick<IFaqCategory, 'id'>>(
      {
        query: body => ({
          url: `/bo-faq-category/${body?.id}`,
          method: 'DELETE',
        }),
      },
    ),
  }),
});

export const {
  useLazyGetFAQsQuery,
  useAddFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
  useApproveDisapproveFAQMutation,
  useLazyGetFAQCategoriesQuery,
  useAddFAQCategoryMutation,
  useUpdateFAQCategoryMutation,
  useDeleteFAQCategoryMutation,
  useGetAllFAQCategoriesQuery,
} = faqAPI;

export const faqsQueryReducer = { [reducerPath]: faqAPI.reducer };
