interface InitialState {
  list: IFaq[];
  categoriesList: IFaqCategory[];
  filters: FaqFilterPayload;
  currentPage: number;
}
interface IFaq {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface ICategory {
  id: number;
  title: string;
}
interface IFaqCategory {
  id: number;
  title: string;
  faqs: IFaq[];
  createdAt: string;
  updatedAt: string;
}

interface FaqFilterPayload {
  searchQuery?: string;
  categoryId?: number;
}

export type {
  InitialState as FAQsInitialState,
  IFaq,
  IFaqCategory,
  ICategory,
  FaqFilterPayload,
};
