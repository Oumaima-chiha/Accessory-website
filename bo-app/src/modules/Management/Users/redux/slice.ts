import { createSlice } from '@reduxjs/toolkit';
import { mergeArrays } from 'utils/functions';
import type { IUser } from 'models';
import type { EndUserFiltersPayload } from '../interfaces';
import type { IReduxUser } from '../interfaces/user';
import { usersAPI } from './queries';

const reducerName = 'users';
export const initialState: IReduxUser.InitialState = {
  list: [],
  filters: {} as EndUserFiltersPayload,
};

export const usersSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    updateUser: (
      state,
      { payload }: { payload: Pick<IUser, 'id' | 'active'> },
    ) => {
      const userToBeUpdated = state?.list?.findIndex(
        user => user?.id === payload?.id,
      );
      state.list[userToBeUpdated].active = payload?.active;
    },
    deleteUser: (state, { payload }: { payload: Pick<IUser, 'id'> }) => {
      state.list = state.list?.filter(user => user?.id !== payload?.id);
    },
    setFilters: (
      state,
      { payload }: { payload: Partial<EndUserFiltersPayload> },
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
      usersAPI.endpoints.getUsers.matchFulfilled,
      (state, { payload }) => {
        state.list = _.uniqBy([...state.list, ...payload], 'id');
        // if (Array.isArray(payload.content)) {
        //   state.list =
        //     payload.currentPage > 1
        //       ? mergeArrays(state.list, payload.content)
        //       : payload.content;
        // }
      },
    );
  },
});

export const { updateUser, deleteUser, setFilters, resetFilters } =
  usersSlice.actions;

export const usersSliceReducer = { [reducerName]: usersSlice.reducer };
