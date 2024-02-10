import { createSlice } from '@reduxjs/toolkit';
import { mergeArrays } from 'utils/functions';
import type {
  FAQCategoryFiltersPayload,
  FAQFiltersPayload,
  IFaq,
  IReduxFAQ,
} from '../interfaces';
import { faqAPI } from './queries';

const reducerName = 'faqs';
export const initialState: IReduxFAQ.InitialState = {
  activeTab: 0,
  faqList: [],
  categoriesList: [],
  faqFilters: {} as FAQFiltersPayload,
  faqCategoryFilters: {} as FAQCategoryFiltersPayload,
};

export const faqsSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    updateTabIndex: (state, { payload }: { payload: number }) => {
      state.activeTab = payload;
    },
    setFAQFilters: (
      state,
      { payload }: { payload: Partial<FAQFiltersPayload> },
    ) => {
      state.faqFilters = {
        ...state.faqFilters,
        ...payload,
      };
    },
    setFaqCategoryFilters: (
      state,
      { payload }: { payload: Partial<FAQCategoryFiltersPayload> },
    ) => {
      state.faqCategoryFilters = {
        ...state.faqCategoryFilters,
        ...payload,
      };
    },
    resetFilters: state => {
      state.faqFilters = initialState.faqFilters;
      state.faqCategoryFilters = initialState.faqCategoryFilters;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      faqAPI.endpoints.getFAQs.matchFulfilled,
      (state, { payload }) => {
        if (Array.isArray(payload.content)) {
          state.faqList =
            payload.currentPage > 1
              ? mergeArrays(state.faqList, payload.content)
              : payload.content;
        }
      },
    );
    builder.addMatcher(
      faqAPI.endpoints.addFAQ.matchFulfilled,
      (state, { payload }) => {
        state.faqList.push(payload);
      },
    );
    builder.addMatcher(
      faqAPI.endpoints.updateFAQ.matchFulfilled,
      (
        state,
        { payload }: { payload: Pick<IReduxFAQ.UpdateFAQPayload, 'id'> },
      ) => {
        const elementToBeUpdated = state?.faqList?.findIndex(
          faq => faq?.id === payload?.id,
        );
        state.faqList[elementToBeUpdated] = {
          ...state.faqList[elementToBeUpdated],
          ...payload,
        };
      },
    );
    builder.addMatcher(
      faqAPI.endpoints.deleteFAQ.matchFulfilled,
      (state, { payload }: { payload: Pick<IFaq, 'id'> }) => {
        state.faqList = state.faqList?.filter(faq => faq?.id !== payload?.id);
      },
    );
    builder.addMatcher(
      faqAPI.endpoints.approveDisapproveFAQ.matchFulfilled,
      (state, { payload }: { payload: IFaq }) => {
        const elementToBeUpdated = state?.faqList?.findIndex(
          newsElement => newsElement?.id === payload?.id,
        );
        state.faqList[elementToBeUpdated] = {
          ...state.faqList[elementToBeUpdated],
          ...payload,
        };
      },
    );
    //? FAQ Categories Matchers
    builder.addMatcher(
      faqAPI.endpoints.getFAQCategories.matchFulfilled,
      (state, { payload }) => {
        if (Array.isArray(payload.content)) {
          state.categoriesList =
            payload.currentPage > 1
              ? mergeArrays(state.categoriesList, payload.content)
              : payload.content;
        }
      },
    );
    builder.addMatcher(
      faqAPI.endpoints.addFAQCategory.matchFulfilled,
      (state, { payload }) => {
        state.categoriesList.push(payload);
      },
    );
    builder.addMatcher(
      faqAPI.endpoints.updateFAQCategory.matchFulfilled,
      (
        state,
        { payload }: { payload: Pick<IReduxFAQ.UpdateFAQPayload, 'id'> },
      ) => {
        const elementToBeUpdated = state?.categoriesList?.findIndex(
          faq => faq?.id === payload?.id,
        );
        state.categoriesList[elementToBeUpdated] = {
          ...state.categoriesList[elementToBeUpdated],
          ...payload,
        };
      },
    );
    builder.addMatcher(
      faqAPI.endpoints.deleteFAQCategory.matchFulfilled,
      (state, { payload }: { payload: Pick<IFaq, 'id'> }) => {
        state.categoriesList = state.categoriesList?.filter(
          faq => faq?.id !== payload?.id,
        );
      },
    );
  },
});

export const {
  setFAQFilters,
  resetFilters,
  setFaqCategoryFilters,
  updateTabIndex,
} = faqsSlice.actions;
export const faqsSliceReducer = { [reducerName]: faqsSlice.reducer };
