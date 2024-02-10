import type {
  FeedbackCategoryFiltersPayload,
  FeedbackFiltersPayload,
  IFeedback,
  IFeedbackCategory,
} from 'modules/Management/Feedback/interfaces';
import type { IRootState } from '..';

export const selectUsersFeedback = (state: IRootState): IFeedback[] =>
  state.feedback.feedbackList;
export const selectFeedbackCategories = (
  state: IRootState,
): IFeedbackCategory[] => state.feedback.categoriesList;
export const selectActiveFeedbackTab = (state: IRootState): number =>
  state.feedback.activeTab;

export const selectUsersFeedbackFilters = (
  state: IRootState,
): FeedbackFiltersPayload => state.feedback.feedbackFilters;
export const selectFeedbackCategoriesFilters = (
  state: IRootState,
): FeedbackCategoryFiltersPayload => state.feedback.categoriesFilters;
