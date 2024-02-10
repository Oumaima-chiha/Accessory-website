import type { STATUS } from 'interfaces';

export interface FAQFiltersPayload {
  titleEn?: string;
  titleAr?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  active?: STATUS;
  startDate?: string;
  endDate?: string;
}

export interface FAQCategoryFiltersPayload {
  titleEn?: string;
  titleAr?: string;
  active?: STATUS;
  startDate?: string;
  endDate?: string;
}
