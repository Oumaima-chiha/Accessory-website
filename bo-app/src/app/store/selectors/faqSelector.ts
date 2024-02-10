import { createSelector } from '@reduxjs/toolkit';
import i18n from 'config/i18n';
import type {
  FAQCategoryFiltersPayload,
  FAQFiltersPayload,
  IFaq,
  IFaqCategory,
} from 'modules/Management/Faq/interfaces';
import { faqAPI } from 'modules/Management/Faq/redux';
import { capitalizeWords, getLabelValuePairs } from 'utils/functions';
import type { IRootState } from '..';

export const selectActiveFaqTab = (state: IRootState): number =>
  state.faqs.activeTab;

export const selectFAQs = (state: IRootState): IFaq[] => state.faqs.faqList;
export const selectFAQCategories = (state: IRootState): IFaqCategory[] =>
  state.faqs.categoriesList;
export const selectFAQCategoriesFilters = (
  state: IRootState,
): FAQCategoryFiltersPayload => state.faqs.faqCategoryFilters;
export const selectFAQsFilters = (state: IRootState): FAQFiltersPayload =>
  state.faqs.faqFilters;

export const selectAllFaqCategories = (
  state: IRootState,
): IFaqCategory[] | undefined =>
  faqAPI.endpoints.getAllFAQCategories.select()(state).data;

export const allFaqCategories = createSelector(selectAllFaqCategories, data =>
  getLabelValuePairs(
    data ?? [],
    `title${capitalizeWords(i18n.language)}` as keyof Pick<
      IFaqCategory,
      'titleEn' | 'titleAr'
    >,
    'id',
  ),
);
