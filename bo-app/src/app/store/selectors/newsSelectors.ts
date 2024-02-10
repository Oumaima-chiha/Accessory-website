import { createSelector } from '@reduxjs/toolkit';
import i18n from 'config/i18n';
import type {
  INews,
  ITopic,
  NewsFiltersPayload,
  TopicFiltersPayload,
} from 'modules/Management/News/interfaces';
import { newsAPI } from 'modules/Management/News/redux';
import { capitalizeWords, getLabelValuePairs } from 'utils/functions';
import type { IRootState } from '..';

export const selectNews = (state: IRootState): INews[] => state.news.newsList;
export const selectTopics = (state: IRootState): ITopic[] =>
  state.news.topicList;
export const selectActiveNewsTab = (state: IRootState): number =>
  state.news.activeTab;

export const selectAllTopics = (state: IRootState): ITopic[] | undefined =>
  newsAPI.endpoints.getAllTopics.select()(state).data;

export const allTopics = createSelector(selectAllTopics, data =>
  getLabelValuePairs(
    data ?? [],
    `title${capitalizeWords(i18n.language)}` as keyof Pick<
      ITopic,
      'titleEn' | 'titleAr'
    >,
    'id',
  ),
);

export const selectNewsFilters = (state: IRootState): NewsFiltersPayload =>
  state.news.newsFilters;
export const selectTopicsFilters = (state: IRootState): TopicFiltersPayload =>
  state.news.topicsFilters;
