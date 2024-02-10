import type { FAQCategoryFiltersPayload, FAQFiltersPayload } from './filters';
import type { IFaq, IFaqCategory } from './types';

declare namespace IReduxFAQ {
  export interface InitialState {
    activeTab: number;
    faqList: IFaq[];
    categoriesList: IFaqCategory[];
    faqFilters: FAQFiltersPayload;
    faqCategoryFilters: FAQCategoryFiltersPayload;
  }

  export type CreateFAQPayload = {
    titleAr: string;
    titleEn: string;
    active: boolean;
  };
  export type UpdateFAQPayload = Partial<IFaq>;
  export type CreateFAQCategoryPayload = Omit<IFaqCategory, 'id'>;
  export type UpdateFAQCategoryPayload = Partial<IFaqCategory>;
}

export { IReduxFAQ };
