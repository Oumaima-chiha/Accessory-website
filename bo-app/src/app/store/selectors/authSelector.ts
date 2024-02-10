import { createSelector } from '@reduxjs/toolkit';
import type { IBOUser, IPermission } from 'models';
import type { IReduxAuth } from 'modules/Authentication/interfaces/auth';
import type { IRootState } from '../reducer';

export const selectAuth = (state: IRootState): IReduxAuth.InitialState =>
  state.auth;
export const selectBOUser = (state: IRootState): IBOUser => state.auth.user;
export const selectIsAuthenticated = (state: IRootState): boolean =>
  state.auth.isAuthenticated ?? false;
export const selectUserPermissions = (
  state: IRootState,
): IPermission[] | undefined => state?.auth?.user?.role?.permissions;

export const selectTransformedUserPermissions = createSelector(
  selectUserPermissions,
  data => data?.map(permission => permission?.code),
);
