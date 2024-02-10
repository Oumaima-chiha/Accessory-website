import { FeedbackStatus } from '.';

interface InitialState {
  list: IFeedback[];
  filters: FeedbackFiltersPayload;
  currentPage: number;
}

interface IFeedbackCategory {
  id: string;
  name: string;
}
interface IFeedback {
  id: number;
  createdAt: string;
  title: string;
  comment: string;
  answer: string;
  status: FeedbackStatus;
  feedbackCategory: {
    id: number;
    name: string;
  };
}
interface IGuestInfo {
  email: string;
  name: string;
  mobileNumber?: string;
}
interface PostFeedbackPayload {
  title: string;
  comment: string;
  feedbackCategoryId: number;
  deleted?: boolean;
  isGuest: boolean;
  guestInfo?: IGuestInfo;
}
interface FeedbackFiltersPayload {
  title?: string;
  feedbackCategoryId?: number;
  status?: FeedbackStatus;
  createdAt?: string;
  startDate?: string;
  endDate?: string;
}

export type {
  InitialState as FeedbackInitialState,
  IFeedback,
  IFeedbackCategory,
  PostFeedbackPayload,
  FeedbackFiltersPayload,
  IGuestInfo,
};
