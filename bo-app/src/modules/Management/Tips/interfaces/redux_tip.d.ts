import type { TipsFiltersPayload } from './filters';
import type { ITip } from './tip';

declare namespace IReduxTip {
  export interface InitialState {
    list: ITip[];
    filters: TipsFiltersPayload;
  }

  export interface CreateTipPayload {
    image: string;
    labelAr: string;
    labelEn: string;
    active: boolean;
  }

  export interface UpdateTipPayload extends Partial<CreateTipPayload> {
    id: number;
  }

  export interface ApproveTipPayload {
    id: number;
    publishDate: string;
  }
}

export { IReduxTip };
