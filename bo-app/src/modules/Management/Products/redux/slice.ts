import { createSlice } from '@reduxjs/toolkit';
import { mergeArrays } from 'utils/functions';
import type { IUser } from 'models';
import type { BOUserFiltersPayload } from '../interfaces/filters';
import type { IReduxUser } from '../interfaces/user';
import { boUsersApi } from './queries';

const reducerName = 'boUsers';
export const initialState: IReduxUser.InitialState = {
  list: [],
  filters: {} as BOUserFiltersPayload,
};

export const boUsersSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    setFilters: (
      state,
      { payload }: { payload: Partial<BOUserFiltersPayload> },
    ) => {
      state.filters = {
        ...state.filters,
        ...payload,
      };
    },
    resetFilters: state => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      boUsersApi.endpoints.getBoUsers.matchFulfilled,
      (state, { payload }) => {
        // state.list = _.uniqBy([...state.list, ...payload.content], 'id');
        if (Array.isArray(payload.content)) {
          state.list =
            payload.currentPage > 1
              ? mergeArrays(state.list, payload.content)
              : payload.content;
        }
      },
    );
    builder.addMatcher(boUsersApi.endpoints.addBoUser.matchFulfilled, state => {
      state.list = [];
    });
    builder.addMatcher(
      boUsersApi.endpoints.updateBoUser.matchFulfilled,
      (
        state,
        { payload }: { payload: Pick<IReduxUser.UpdateUserPayload, 'id'> },
      ) => {
        const userToBeUpdated = state?.list?.findIndex(
          user => user?.id === payload?.id,
        );
        state.list[userToBeUpdated] = {
          ...state.list[userToBeUpdated],
          ...payload,
        };
      },
    );
    builder.addMatcher(
      boUsersApi.endpoints.deleteBoUser.matchFulfilled,
      (state, { payload }: { payload: Pick<IUser, 'id'> }) => {
        state.list = state.list?.filter(user => user?.id !== payload?.id);
      },
    );
  },
});

export const { setFilters, resetFilters } = boUsersSlice.actions;

export const boUsersSliceReducer = { [reducerName]: boUsersSlice.reducer };
