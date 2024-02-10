import type { IUser } from 'models';
import type { EndUserFiltersPayload } from 'modules/Management/Users/interfaces';
import type { IRootState } from '..';

export const selectEndUsers = (state: IRootState): IUser[] => state.users.list;
export const selectEndUsersFilters = (
  state: IRootState,
): EndUserFiltersPayload => state.users.filters;
