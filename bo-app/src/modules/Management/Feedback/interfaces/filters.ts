import type { STATUS } from 'interfaces';

export interface FeedbackFiltersPayload {
  title?: string;
  comment?: string;
  answer?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export interface FeedbackCategoryFiltersPayload {
  nameAr?: string;
  nameEn?: string;
  status?: STATUS;
  startDate?: string;
  endDate?: string;
}
