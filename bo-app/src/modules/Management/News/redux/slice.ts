import { createSlice } from '@reduxjs/toolkit';
import { mergeArrays } from 'utils/functions';
import type {
  INews,
  ITopic,
  NewsFiltersPayload,
  TopicFiltersPayload,
} from '../interfaces';
import type { IReduxNews } from '../interfaces/redux_news';
import { newsAPI } from './queries';

const reducerName = 'news';
export const initialState: IReduxNews.InitialState = {
  activeTab: 0,
  newsList: [],
  topicList: [],
  newsFilters: {} as NewsFiltersPayload,
  topicsFilters: {} as TopicFiltersPayload,
};

export const newsSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    updateTabIndex: (state, { payload }: { payload: number }) => {
      state.activeTab = payload;
    },
    setNewsFilters: (
      state,
      { payload }: { payload: Partial<NewsFiltersPayload> },
    ) => {
      state.newsFilters = {
        ...state.newsFilters,
        ...payload,
      };
    },
    setTopicsFilters: (
      state,
      { payload }: { payload: Partial<TopicFiltersPayload> },
    ) => {
      state.topicsFilters = {
        ...state.topicsFilters,
        ...payload,
      };
    },
    resetFilters: state => {
      state.topicsFilters = initialState.topicsFilters;
      state.newsFilters = initialState.newsFilters;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      newsAPI.endpoints.getNews.matchFulfilled,
      (state, { payload }) => {
        if (Array.isArray(payload.content)) {
          state.newsList =
            payload.currentPage > 1
              ? mergeArrays(state.newsList, payload.content)
              : payload.content;
        }
      },
    );
    builder.addMatcher(newsAPI.endpoints.createNews.matchFulfilled, state => {
      state.newsList = [];
    });
    builder.addMatcher(
      newsAPI.endpoints.updateNews.matchFulfilled,
      (
        state,
        { payload }: { payload: Pick<IReduxNews.UpdateNewsPayload, 'id'> },
      ) => {
        const newsToBeUpdated = state?.newsList?.findIndex(
          news => news?.id === payload?.id,
        );
        state.newsList[newsToBeUpdated] = {
          ...state.newsList[newsToBeUpdated],
          ...payload,
        };
      },
    );
    builder.addMatcher(
      newsAPI.endpoints.deleteNews.matchFulfilled,
      (state, { payload }: { payload: Pick<INews, 'id'> }) => {
        state.newsList = state.newsList?.filter(
          news => news?.id !== payload?.id,
        );
      },
    );
    builder.addMatcher(
      newsAPI.endpoints.approveDisapproveNews.matchFulfilled,
      (state, { payload }: { payload: INews }) => {
        const elementToBeUpdated = state?.newsList?.findIndex(
          newsElement => newsElement?.id === payload?.id,
        );
        state.newsList[elementToBeUpdated] = {
          ...state.newsList[elementToBeUpdated],
          ...payload,
        };
      },
    );
    //* --------------- Topics Queries
    builder.addMatcher(
      newsAPI.endpoints.getTopics.matchFulfilled,
      (state, { payload }) => {
        if (Array.isArray(payload.content)) {
          state.topicList =
            payload.currentPage > 1
              ? mergeArrays(state.topicList, payload.content)
              : payload.content;
        }
      },
    );
    builder.addMatcher(
      newsAPI.endpoints.updateTopic.matchFulfilled,
      (
        state,
        { payload }: { payload: Pick<IReduxNews.UpdateTopicPayload, 'id'> },
      ) => {
        const topicToBeUpdated = state?.topicList?.findIndex(
          topic => topic?.id === payload?.id,
        );
        state.topicList[topicToBeUpdated] = {
          ...state.topicList[topicToBeUpdated],
          ...payload,
        };
      },
    );
    builder.addMatcher(
      newsAPI.endpoints.deleteTopic.matchFulfilled,
      (state, { payload }: { payload: Pick<ITopic, 'id'> }) => {
        state.topicList = state.topicList?.filter(
          news => news?.id !== payload?.id,
        );
      },
    );
  },
});

export const {
  updateTabIndex,
  setNewsFilters,
  setTopicsFilters,
  resetFilters,
} = newsSlice.actions;
export const newsSliceReducer = { [reducerName]: newsSlice.reducer };
