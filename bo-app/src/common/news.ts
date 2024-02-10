interface InitialState {
  list: INews[];
  filters: NewsFiltersPayload;
  currentPage: number;
}
interface INews {
  id: number;
  title: string;
  description: string;
  image: string;
  topic: ITopic;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
interface ITopic {
  id: number;
  title: string;
  news: INews[];
}

interface NewsFiltersPayload {
  topicId?:number
  title?: string;
  description?: number;

  startDate?: string;
  endDate?: string;
}

export type {
  InitialState as NewsInitialState,
  INews,
  ITopic,
  NewsFiltersPayload,
};
