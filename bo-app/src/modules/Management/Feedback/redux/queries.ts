import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from 'app/api';
import config from 'config/app_config';
import type { IPaginationPayload, IPaginationResponse } from 'interfaces';
import { ExcelFileNames } from 'interfaces/enums/excelFileNames';
import { downloadFile } from 'utils/functions';
import type {
  IFeedback,
  IFeedbackCategory,
  IReduxFeedback,
} from '../interfaces';

const reducerPath = 'feedbackApi';
export const feedbackAPI = createApi({
  reducerPath,
  baseQuery: customFetchBase,
  tagTypes: ['UserFeedbacks', 'FeedbackCategories'],
  endpoints: builder => ({
    getFeedbackCategories: builder.query<
      IPaginationResponse<IFeedbackCategory>,
      IPaginationPayload
    >({
      query: ({
        page = 1,
        size = config.defaultPaginationSize,
        ...params
      }) => ({
        url: '/bo-feedback-category',
        method: 'GET',
        params: {
          page,
          size,
          ...params,
        },
      }),
      providesTags: () => [{ type: 'FeedbackCategories' }],
    }),
    getFeedbackCategoryById: builder.query<IFeedbackCategory, number>({
      query: categoryId => ({
        url: `/bo-feedback-category/${categoryId}`,
        method: 'GET',
      }),
    }),
    addFeedbackCategory: builder.mutation<
      IFeedbackCategory,
      IReduxFeedback.CreateFeedbackCategoryPayload
    >({
      query: body => ({
        url: '/bo-feedback-category',
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [{ type: 'FeedbackCategories' }],
    }),
    updateFeedbackCategory: builder.mutation<
      IFeedbackCategory,
      IReduxFeedback.UpdateFeedbackCategoryPayload
    >({
      query: body => ({
        url: `/bo-feedback-category/${body?.id}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteFeedbackCategory: builder.mutation<
      IFeedbackCategory,
      Pick<IFeedbackCategory, 'id'>
    >({
      query: body => ({
        url: `/bo-feedback-category/${body?.id}`,
        method: 'DELETE',
      }),
    }),
    //* -------------- Users Feedback Section -----------------
    exportData: builder.mutation<Blob, void>({
      query: () => ({
        url: '/bo-feedback/export-excel',
        method: 'POST',
        responseHandler: async (
          response,
        ): Promise<Response | Record<string, any>> => {
          if (response.ok) {
            const blob = await response.blob();
            downloadFile(blob, ExcelFileNames.USERS_FEEDBACK);
            return { data: response?.status };
          }
          const result = await response.json();
          return result;
        },
        cache: 'no-cache',
      }),
    }),
    getUserFeedbacks: builder.query<
      IPaginationResponse<IFeedback>,
      IPaginationPayload
    >({
      query: ({
        page = 1,
        size = config.defaultPaginationSize,
        ...params
      }) => ({
        url: '/bo-feedback',
        method: 'GET',
        params: {
          page,
          size,
          ...params,
        },
      }),
      providesTags: () => [{ type: 'UserFeedbacks' }],
    }),
    answerUserFeedback: builder.mutation<
      IFeedback,
      IReduxFeedback.AnswerUserFeedbackPayload
    >({
      query: body => ({
        url: `/bo-feedback/${body?.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: () => [{ type: 'UserFeedbacks' }],
    }),
    deleteUserFeedback: builder.mutation<IFeedback, Pick<IFeedback, 'id'>>({
      query: body => ({
        url: `/bo-feedback/${body?.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddFeedbackCategoryMutation,
  useUpdateFeedbackCategoryMutation,
  useDeleteFeedbackCategoryMutation,
  useGetFeedbackCategoriesQuery,
  useGetUserFeedbacksQuery,
  useLazyGetFeedbackCategoriesQuery,
  useLazyGetUserFeedbacksQuery,
  useAnswerUserFeedbackMutation,
  useDeleteUserFeedbackMutation,
  useLazyGetFeedbackCategoryByIdQuery,
  useExportDataMutation,
} = feedbackAPI;

export const feedbackQueryReducer = { [reducerPath]: feedbackAPI.reducer };
