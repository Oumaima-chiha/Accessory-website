import { createSlice } from '@reduxjs/toolkit';

import type { IBOUser, IRole } from 'models';
import type { IReduxAuth } from '../interfaces/auth';

import { authAPI } from './auth.query';
import {parseJwt} from 'utils/functions';
import {StorageKeys} from 'common';

const reducerName = 'auth';
export const initialState: IReduxAuth.InitialState = {
  user: {} as IBOUser,
  isAuthenticated: false,
  refreshToken: null,
};

export const authSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem(StorageKeys.TOKEN);
      return initialState;
    },
    login: state => {
      state.isAuthenticated = true;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      authAPI.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        const { role, sub } = parseJwt<IBOUser>(payload?.accessToken);
        state.user = {
          ...state.user,
          id: +sub,
          role: role ?? ({} as IRole),
        };
        state.refreshToken = payload?.refreshToken;
        localStorage.setItem(StorageKeys.TOKEN, payload?.accessToken);
        state.isAuthenticated = true;
      },
    );
    builder.addMatcher(
      authAPI.endpoints.getProfile.matchFulfilled,
      (state, { payload }) => {
        state.user = {
          ...state.user,
          ...payload,
        };
      },
    );
  },
});

export const { logout, login } = authSlice.actions;

export const authSliceReducer = { [reducerName]: authSlice.reducer };
