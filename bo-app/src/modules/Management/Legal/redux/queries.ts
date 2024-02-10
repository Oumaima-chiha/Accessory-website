import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from 'app/api';
import config from 'config/app_config';
import type {
  ContentApproval,
  IPaginationPayload,
  IPaginationResponse,
} from 'interfaces';
import type {
  IPrivacyPolicy,
  IReduxLegal,
  ITermsConditions,
} from '../interfaces';

const reducerPath = 'legalApi';
export const legalApi = createApi({
  reducerPath,
  baseQuery: customFetchBase,
  tagTypes: ['TermsConditions', 'PrivacyPolicy'],
  endpoints: builder => ({
    getPrivacyPolicy: builder.query<
      IPaginationResponse<IPrivacyPolicy>,
      IPaginationPayload
    >({
      query: ({
        page = 1,
        size = config.defaultPaginationSize,
        ...params
      }) => ({
        url: '/bo-privacy-policies',
        method: 'GET',
        params: {
          page,
          size,
          ...params,
        },
      }),
      providesTags: () => [{ type: 'PrivacyPolicy' }],
    }),
    addPrivacyPolicy: builder.mutation<
      IPrivacyPolicy,
      IReduxLegal.CreatePrivacyPolicyPayload
    >({
      query: body => ({
        url: '/bo-privacy-policies',
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [{ type: 'PrivacyPolicy' }],
    }),
    updatePrivacyPolicy: builder.mutation<
      IPrivacyPolicy,
      IReduxLegal.UpdatePrivacyPolicyPayload
    >({
      query: body => ({
        url: `/bo-privacy-policies/${body?.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: () => [{ type: 'PrivacyPolicy' }],
    }),
    deletePrivacyPolicy: builder.mutation<
      IPrivacyPolicy,
      Pick<IPrivacyPolicy, 'id'>
    >({
      query: body => ({
        url: `/bo-privacy-policies/${body?.id}`,
        method: 'DELETE',
      }),
    }),
    //* -------------- Terms & Conditions Section -----------------
    getTermsConditions: builder.query<
      IPaginationResponse<ITermsConditions>,
      IPaginationPayload
    >({
      query: ({
        page = 1,
        size = config.defaultPaginationSize,
        ...params
      }) => ({
        url: '/bo-terms-and-conditions',
        method: 'GET',
        params: {
          page,
          size,
          ...params,
        },
      }),
      providesTags: () => [{ type: 'TermsConditions' }],
    }),
    addTermsCondition: builder.mutation<
      ITermsConditions,
      IReduxLegal.CreateTermsConditionPayload
    >({
      query: body => ({
        url: '/bo-terms-and-conditions',
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [{ type: 'TermsConditions' }],
    }),
    updateTermsConditions: builder.mutation<
      ITermsConditions,
      IReduxLegal.UpdateTermsConditionPayload
    >({
      query: body => ({
        url: `/bo-terms-and-conditions/${body?.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: () => [{ type: 'TermsConditions' }],
    }),
    deleteTermsCondition: builder.mutation<
      ITermsConditions,
      Pick<ITermsConditions, 'id'>
    >({
      query: body => ({
        url: `/bo-terms-and-conditions/${body?.id}`,
        method: 'DELETE',
      }),
    }),
    approveDisapproveTermsCondition: builder.mutation<
      ITermsConditions,
      ContentApproval
    >({
      query: ({ type, payload }) => ({
        url: `/bo-terms-and-conditions/${payload?.id}/${type}`,
        method: 'PATCH',
        body: payload,
      }),
    }),
    approveDisapprovePrivacyPolicy: builder.mutation<
      IPrivacyPolicy,
      ContentApproval
    >({
      query: ({ type, payload }) => ({
        url: `/bo-privacy-policies/${payload?.id}/${type}`,
        method: 'PATCH',
        body: payload,
      }),
    }),
  }),
});

export const {
  useAddPrivacyPolicyMutation,
  useUpdatePrivacyPolicyMutation,
  useDeletePrivacyPolicyMutation,
  useGetPrivacyPolicyQuery,
  useGetTermsConditionsQuery,
  useLazyGetPrivacyPolicyQuery,
  useLazyGetTermsConditionsQuery,
  useUpdateTermsConditionsMutation,
  useAddTermsConditionMutation,
  useDeleteTermsConditionMutation,
  useApproveDisapprovePrivacyPolicyMutation,
  useApproveDisapproveTermsConditionMutation,
} = legalApi;

export const legalQueryReducer = { [reducerPath]: legalApi.reducer };
