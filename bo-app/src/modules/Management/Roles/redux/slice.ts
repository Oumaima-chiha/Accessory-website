import { createSlice } from '@reduxjs/toolkit';
import { mergeArrays } from 'utils/functions';
import type { IRole } from 'models/role';
import type { RoleFiltersPayload } from '../interfaces';
import type { IReduxRole } from '../interfaces/role';
import { rolesAPI } from './queries';

const reducerName = 'roles';
export const initialState: IReduxRole.InitialState = {
  list: [],
  categories: [],
  filters: {} as RoleFiltersPayload,
};

export const rolesSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    setFilters: (
      state,
      { payload }: { payload: Partial<RoleFiltersPayload> },
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
      rolesAPI.endpoints.getRoles.matchFulfilled,
      (state, { payload }) => {
        if (Array.isArray(payload.content)) {
          state.list =
            payload.currentPage > 1
              ? mergeArrays(state.list, payload.content)
              : payload.content;
        }
      },
    );
    builder.addMatcher(
      rolesAPI.endpoints.getAllRoles.matchFulfilled,
      (state, { payload }) => {
        state.list = payload;
      },
    );
    builder.addMatcher(rolesAPI.endpoints.addRole.matchFulfilled, state => {
      state.list = [];
    });
    builder.addMatcher(
      rolesAPI.endpoints.updateRole.matchFulfilled,
      (
        state,
        { payload }: { payload: Pick<IReduxRole.UpdateRolePayload, 'id'> },
      ) => {
        const roleToBeUpdated = state?.list?.findIndex(
          role => role?.id === payload?.id,
        );
        state.list[roleToBeUpdated] = {
          ...state.list[roleToBeUpdated],
          ...payload,
        };
      },
    );
    builder.addMatcher(
      rolesAPI.endpoints.deleteRole.matchFulfilled,
      (state, { payload }: { payload: Pick<IRole, 'id'> }) => {
        state.list = state.list?.filter(role => role?.id !== payload?.id);
      },
    );
    builder.addMatcher(
      rolesAPI.endpoints.getAllCategories.matchFulfilled,
      (state, { payload }) => {
        state.categories = payload;
      },
    );
  },
});
export const { setFilters, resetFilters } = rolesSlice.actions;

export const rolesSliceReducer = { [reducerName]: rolesSlice.reducer };
