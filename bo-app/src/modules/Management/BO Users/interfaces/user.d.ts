import type { IBOUser } from 'models';
import type { BOUserFiltersPayload } from './filters';

declare namespace IReduxUser {
  export interface InitialState {
    list: IBOUser[];
    filters: BOUserFiltersPayload;
  }

  export interface CreateUserPayload {
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    email: string;
    roleId: number;
    active: boolean;
  }

  export interface UpdateUserPayload extends Partial<CreateUserPayload> {
    id: number;
  }
}

export { IReduxUser };
