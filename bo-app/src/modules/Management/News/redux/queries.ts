import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from 'app/api';
import config from 'config/app_config';
import type {
  ContentApproval,
  IPaginationPayload,
  IPaginationResponse,
} from 'interfaces';
import type {
  INews,
  IReduxNews,
  ITopic,
  NewsFiltersPayload,
  TopicFiltersPayload,
} from '../interfaces';

const reducerPath = 'newsApi';
export const newsAPI = createApi({
  reducerPath,
  baseQuery: customFetchBase,
  tagTypes: ['News', 'Topics'],
  endpoints: builder => ({
    getNews: builder.query<
      IPaginationResponse<INews>,
      IPaginationPayload & NewsFiltersPayload
    >({
      query: ({
        page = 1,
        size = config.defaultPaginationSize,
        ...params
      }) => ({
        url: '/bo-news',
        method: 'GET',
        params: {
          page,
          size,
          ...params,
        },
      }),
      providesTags: () => [{ type: 'News' }],
    }),
    createNews: builder.mutation<INews, FormData>({
      query: body => ({
        url: '/bo-news',
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [{ type: 'News' }],
    }),
    updateNews: builder.mutation<INews, FormData>({
      query: body => ({
        url: `/bo-news/${body.get('id')}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteNews: builder.mutation<INews, Pick<INews, 'id'>>({
      query: body => ({
        url: `/bo-news/${body?.id}`,
        method: 'DELETE',
      }),
    }),
    approveDisapproveNews: builder.mutation<INews, ContentApproval>({
      query: ({ type, payload }) => ({
        url: `/bo-news/${payload?.id}/${type}`,
        method: 'PATCH',
        body: payload,
      }),
    }),
    //* ------------------ Topics Management ----------------------

    getTopics: builder.query<
      IPaginationResponse<ITopic>,
      IPaginationPayload & TopicFiltersPayload
    >({
      query: ({
        page = 1,
        size = config.defaultPaginationSize,
        ...params
      }) => ({
        url: '/bo-topic',
        method: 'GET',
        params: {
          page,
          size,
          ...params,
        },
      }),
      providesTags: () => [{ type: 'Topics' }],
    }),
    getAllTopics: builder.query<ITopic[], void>({
      query: () => ({
        url: '/bo-topic/unpaged',
        method: 'GET',
      }),
    }),
    createTopic: builder.mutation<ITopic, IReduxNews.CreateTopicPayload>({
      query: body => ({
        url: '/bo-topic',
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [{ type: 'Topics' }],
    }),
    updateTopic: builder.mutation<ITopic, IReduxNews.UpdateTopicPayload>({
      query: body => ({
        url: `/bo-topic/${body?.id}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteTopic: builder.mutation<ITopic, Pick<ITopic, 'id'>>({
      query: body => ({
        url: `/bo-topic/${body?.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetNewsQuery,
  useLazyGetNewsQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
  useCreateTopicMutation,
  useUpdateTopicMutation,
  useDeleteTopicMutation,
  useGetTopicsQuery,
  useLazyGetTopicsQuery,
  useGetAllTopicsQuery,
  useApproveDisapproveNewsMutation,
} = newsAPI;

export const newsQueryReducer = { [reducerPath]: newsAPI.reducer };
