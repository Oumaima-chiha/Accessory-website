import { createSlice } from '@reduxjs/toolkit';
import { mergeArrays } from 'utils/functions';
import type {
  IPrivacyPolicy,
  IReduxLegal,
  ITermsConditions,
  LegalFiltersPayload,
} from '../interfaces';
import { legalApi } from './queries';

const reducerName = 'legal';
export const initialState: IReduxLegal.InitialState = {
  activeTab: 0,
  termsConditions: [],
  privacyPolicy: [],
  termsConditionsFilters: {} as LegalFiltersPayload,
  privacyPolicyFilters: {} as LegalFiltersPayload,
};

export const legalSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    updateTabIndex: (state, { payload }: { payload: number }) => {
      state.activeTab = payload;
    },
    setTermsConditionsFilters: (
      state,
      { payload }: { payload: Partial<LegalFiltersPayload> },
    ) => {
      state.termsConditionsFilters = {
        ...state.termsConditionsFilters,
        ...payload,
      };
    },
    setPrivacyPolicyFilters: (
      state,
      { payload }: { payload: Partial<LegalFiltersPayload> },
    ) => {
      state.privacyPolicyFilters = {
        ...state.privacyPolicyFilters,
        ...payload,
      };
    },
    resetFilters: state => {
      state.termsConditionsFilters = initialState.termsConditionsFilters;
      state.privacyPolicyFilters = initialState.privacyPolicyFilters;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      legalApi.endpoints.getPrivacyPolicy.matchFulfilled,
      (state, { payload }) => {
        if (Array.isArray(payload.content)) {
          state.privacyPolicy =
            payload.currentPage > 1
              ? mergeArrays(state.privacyPolicy, payload.content)
              : payload.content;
        }
      },
    );
    builder.addMatcher(
      legalApi.endpoints.addPrivacyPolicy.matchFulfilled,
      state => {
        state.privacyPolicy = [];
      },
    );
    builder.addMatcher(
      legalApi.endpoints.deletePrivacyPolicy.matchFulfilled,
      (state, { payload }: { payload: Pick<IPrivacyPolicy, 'id'> }) => {
        state.privacyPolicy = state.privacyPolicy?.filter(
          privacyPolicy => privacyPolicy?.id !== payload?.id,
        );
      },
    );
    builder.addMatcher(
      legalApi.endpoints.getTermsConditions.matchFulfilled,
      (state, { payload }) => {
        if (Array.isArray(payload.content)) {
          state.termsConditions =
            payload.currentPage > 1
              ? mergeArrays(state.termsConditions, payload.content)
              : payload.content;
        }
      },
    );
    builder.addMatcher(
      legalApi.endpoints.addTermsCondition.matchFulfilled,
      (
        state,
        {
          payload,
        }: {
          payload: ITermsConditions;
        },
      ) => {
        const termsConditionToBeUpdated = state?.termsConditions?.findIndex(
          termsCondition => termsCondition?.id === payload?.id,
        );
        state.termsConditions[termsConditionToBeUpdated] = {
          ...state.termsConditions[termsConditionToBeUpdated],
          ...payload,
        };
      },
    );
    builder.addMatcher(
      legalApi.endpoints.deleteTermsCondition.matchFulfilled,
      (state, { payload }: { payload: Pick<ITermsConditions, 'id'> }) => {
        state.termsConditions = state.termsConditions?.filter(
          termsCondition => termsCondition?.id !== payload?.id,
        );
      },
    );
    builder.addMatcher(
      legalApi.endpoints.approveDisapprovePrivacyPolicy.matchFulfilled,
      (state, { payload }: { payload: IPrivacyPolicy }) => {
        const privacyToBeUpdated = state?.privacyPolicy?.findIndex(
          privacyElement => privacyElement?.id === payload?.id,
        );
        state.privacyPolicy[privacyToBeUpdated] = {
          ...state.privacyPolicy[privacyToBeUpdated],
          ...payload,
        };
      },
    );
    builder.addMatcher(
      legalApi.endpoints.approveDisapproveTermsCondition.matchFulfilled,
      (state, { payload }: { payload: ITermsConditions }) => {
        const termsToBeUpdated = state?.termsConditions?.findIndex(
          termsElement => termsElement?.id === payload?.id,
        );
        state.termsConditions[termsToBeUpdated] = {
          ...state.termsConditions[termsToBeUpdated],
          ...payload,
        };
      },
    );
  },
});

export const {
  updateTabIndex,
  setTermsConditionsFilters,
  setPrivacyPolicyFilters,
  resetFilters,
} = legalSlice.actions;
export const legalSliceReducer = { [reducerName]: legalSlice.reducer };
