import type { ICategory, IRole } from 'models/role';
import type { RoleFiltersPayload } from './filters';

declare namespace IReduxRole {
  export interface InitialState {
    list: IRole[];
    categories: ICategory[];
    filters: RoleFiltersPayload;
  }

  export interface CreateRolePayload {
    name: string;
    permissions: number[];
  }

  export interface UpdateRolePayload extends CreateRolePayload {
    id: number;
  }
}

export { IReduxRole };
