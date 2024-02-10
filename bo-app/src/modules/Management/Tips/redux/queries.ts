import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from 'app/api';
import config from 'config/app_config';
import type {
  ContentApproval,
  IPaginationPayload,
  IPaginationResponse,
} from 'interfaces';
import type { ITip, TipsFiltersPayload } from '../interfaces';

const reducerPath = 'tipsApi';
export const tipsAPI = createApi({
  reducerPath,
  baseQuery: customFetchBase,
  tagTypes: ['Tips'],
  endpoints: builder => ({
    getTips: builder.query<
      IPaginationResponse<ITip>,
      IPaginationPayload & TipsFiltersPayload
    >({
      query: ({
        page = 1,
        size = config.defaultPaginationSize,
        ...params
      }) => ({
        url: '/bo/tips',
        method: 'GET',
        params: {
          page,
          size,
          ...params,
        },
      }),
      providesTags: () => [{ type: 'Tips' }],
    }),
    addTip: builder.mutation<ITip, FormData>({
      query: body => ({
        url: '/bo/tips/',
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [{ type: 'Tips' }],
    }),
    updateTip: builder.mutation<ITip, FormData>({
      query: body => ({
        url: `/bo/tips/${body.get('id')}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteTip: builder.mutation<ITip, Pick<ITip, 'id'>>({
      query: body => ({
        url: `/bo/tips/${body?.id}`,
        method: 'DELETE',
      }),
    }),
    approveDisapproveTip: builder.mutation<ITip, ContentApproval>({
      query: ({ type, payload }) => ({
        url: `/bo/tips/${payload?.id}/${type}`,
        method: 'PATCH',
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetTipsQuery,
  useLazyGetTipsQuery,
  useAddTipMutation,
  useUpdateTipMutation,
  useDeleteTipMutation,
  useApproveDisapproveTipMutation,
} = tipsAPI;

export const tipsQueryReducer = { [reducerPath]: tipsAPI.reducer };
