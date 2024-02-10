import type { IFeedback, IFeedbackCategory } from './feedback';
import type {
  FeedbackCategoryFiltersPayload,
  FeedbackFiltersPayload,
} from './filters';

declare namespace IReduxFeedback {
  export interface InitialState {
    activeTab: number;
    feedbackList: IFeedback[];
    categoriesList: IFeedbackCategory[];
    feedbackFilters: FeedbackFiltersPayload;
    categoriesFilters: FeedbackCategoryFiltersPayload;
  }

  export interface CreateFeedbackCategoryPayload {
    nameAr: string;
    nameEn: string;
    active: boolean;
  }

  export interface UpdateFeedbackCategoryPayload
    extends Partial<CreateFeedbackCategoryPayload> {
    id: number;
  }

  export interface AnswerUserFeedbackPayload {
    id: number;
    answer: string;
  }
}

export { IReduxFeedback };
