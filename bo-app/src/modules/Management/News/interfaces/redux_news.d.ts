import type { NewsFiltersPayload, TopicFiltersPayload } from './filters';
import type { INews } from './news';

declare namespace IReduxNews {
  export interface InitialState {
    activeTab: number;
    newsList: INews[];
    topicList: ITopic[];
    newsFilters: NewsFiltersPayload;
    topicsFilters: TopicFiltersPayload;
  }

  export interface CreateNewsPayload {
    titleAr: string;
    titleEn: string;
    description: string;
    image: File;
    active: boolean;
  }

  export interface CreateTopicPayload {
    titleAr: string;
    titleEn: string;
    active: boolean;
  }

  export interface UpdateNewsPayload extends Partial<CreateNewsPayload> {
    id: number;
  }

  export interface UpdateTopicPayload extends Partial<CreateTopicPayload> {
    id: number;
  }
}

export { IReduxNews };
