import type { IRole } from 'models';
import type { RoleFiltersPayload } from 'modules/Management/Roles/interfaces';
import type { IRootState } from '..';

export const selectRoles = (state: IRootState): IRole[] => state.roles.list;
export const selectRolesFilters = (state: IRootState): RoleFiltersPayload =>
  state.roles.filters;
