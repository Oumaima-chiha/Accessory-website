import type { STATUS } from 'interfaces';

export interface NewsFiltersPayload {
  titleEn?: string;
  titleAr?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  status?: STATUS;
  startDate?: string;
  endDate?: string;
}

export interface TopicFiltersPayload {
  titleEn?: string;
  titleAr?: string;
  active?: STATUS;
  startDate?: string;
  endDate?: string;
}
