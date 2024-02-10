import type { IUser } from 'models/user';
import type { EndUserFiltersPayload } from './filters';

declare namespace IReduxUser {
  export interface InitialState {
    list: IUser[];
    filters: EndUserFiltersPayload;
  }

  export interface UpdateUserPayload {
    id: number;
    active: boolean;
  }
}

export { IReduxUser };
