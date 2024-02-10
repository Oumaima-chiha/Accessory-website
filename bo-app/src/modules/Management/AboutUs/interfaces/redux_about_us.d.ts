import type { IAboutUs } from './about_us';
import type { AboutUssFiltersPayload } from './filters';

declare namespace IReduxAboutUs {
  export interface InitialState {
    list: IAboutUs[];
    filters: AboutUssFiltersPayload;
  }

  export interface CreateAboutUsPayload {
    titleAr: string;
    titleEn: string;
    contentAr: string;
    contentEn: string;
    active: boolean;
  }

  export interface UpdateAboutUsPayload extends Partial<CreateAboutUsPayload> {
    id: number;
  }
}

export { IReduxAboutUs };
