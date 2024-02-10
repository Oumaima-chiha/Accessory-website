import type { IBOUser } from 'models';
import type { BOUserFiltersPayload } from 'modules/Management/BO Users/interfaces/filters';
import type { IRootState } from '..';

export const selectBOUsers = (state: IRootState): IBOUser[] =>
  state.boUsers.list;
export const selectBOUsersFilters = (state: IRootState): BOUserFiltersPayload =>
  state.boUsers.filters;
