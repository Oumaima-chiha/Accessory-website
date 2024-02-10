import { createSlice } from '@reduxjs/toolkit';
import { mergeArrays } from 'utils/functions';
import type {
  FeedbackCategoryFiltersPayload,
  FeedbackFiltersPayload,
  IFeedback,
  IFeedbackCategory,
  IReduxFeedback,
} from '../interfaces';
import { feedbackAPI } from './queries';

const reducerName = 'feedback';
export const initialState: IReduxFeedback.InitialState = {
  activeTab: 0,
  feedbackList: [],
  categoriesList: [],
  feedbackFilters: {} as FeedbackFiltersPayload,
  categoriesFilters: {} as FeedbackCategoryFiltersPayload,
};

export const feedbackSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    updateTabIndex: (state, { payload }: { payload: number }) => {
      state.activeTab = payload;
    },
    deleteFeedback: (
      state,
      { payload }: { payload: Pick<IFeedback, 'id'> },
    ) => {
      state.feedbackList = state.feedbackList?.filter(
        feedback => feedback?.id !== payload?.id,
      );
    },
    setFeedbackFilters: (
      state,
      { payload }: { payload: Partial<FeedbackFiltersPayload> },
    ) => {
      state.feedbackFilters = {
        ...state.feedbackFilters,
        ...payload,
      };
    },
    setCategoriesFilters: (
      state,
      { payload }: { payload: Partial<FeedbackCategoryFiltersPayload> },
    ) => {
      state.categoriesFilters = {
        ...state.categoriesFilters,
        ...payload,
      };
    },
    resetFilters: state => {
      state.feedbackFilters = initialState.feedbackFilters;
      state.categoriesFilters = initialState.categoriesFilters;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      feedbackAPI.endpoints.getFeedbackCategories.matchFulfilled,
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
      feedbackAPI.endpoints.addFeedbackCategory.matchFulfilled,
      state => {
        state.categoriesList = [];
      },
    );
    builder.addMatcher(
      feedbackAPI.endpoints.updateFeedbackCategory.matchFulfilled,
      (
        state,
        {
          payload,
        }: {
          payload: Pick<IReduxFeedback.UpdateFeedbackCategoryPayload, 'id'>;
        },
      ) => {
        const feedbackCategoryToBeUpdated = state?.categoriesList?.findIndex(
          feedbackCategory => feedbackCategory?.id === payload?.id,
        );
        state.categoriesList[feedbackCategoryToBeUpdated] = {
          ...state.categoriesList[feedbackCategoryToBeUpdated],
          ...payload,
        };
      },
    );
    builder.addMatcher(
      feedbackAPI.endpoints.deleteFeedbackCategory.matchFulfilled,
      (state, { payload }: { payload: Pick<IFeedbackCategory, 'id'> }) => {
        state.categoriesList = state.categoriesList?.filter(
          feedbackCategory => feedbackCategory?.id !== payload?.id,
        );
      },
    );
    builder.addMatcher(
      feedbackAPI.endpoints.getUserFeedbacks.matchFulfilled,
      (state, { payload }) => {
        if (Array.isArray(payload.content)) {
          state.feedbackList =
            payload.currentPage > 1
              ? mergeArrays(state.feedbackList, payload.content)
              : payload.content;
        }
      },
    );
    builder.addMatcher(
      feedbackAPI.endpoints.answerUserFeedback.matchFulfilled,
      (
        state,
        {
          payload,
        }: {
          payload: IFeedback;
        },
      ) => {
        const feedbackToBeUpdated = state?.feedbackList?.findIndex(
          feedback => feedback?.id === payload?.id,
        );
        state.feedbackList[feedbackToBeUpdated] = {
          ...state.feedbackList[feedbackToBeUpdated],
          ...payload,
        };
      },
    );
    builder.addMatcher(
      feedbackAPI.endpoints.deleteUserFeedback.matchFulfilled,
      (state, { payload }: { payload: Pick<IFeedback, 'id'> }) => {
        state.feedbackList = state.feedbackList?.filter(
          feedback => feedback?.id !== payload?.id,
        );
      },
    );
  },
});

export const {
  deleteFeedback,
  updateTabIndex,
  setFeedbackFilters,
  setCategoriesFilters,
  resetFilters,
} = feedbackSlice.actions;
export const feedbackSliceReducer = { [reducerName]: feedbackSlice.reducer };
