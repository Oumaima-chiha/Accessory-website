import { createSlice } from '@reduxjs/toolkit';
import { mergeArrays } from 'utils/functions';
import type {
  INotification,
  IReduxNotification,
  NotificationsFiltersPayload,
} from '../interfaces';
import { notificationsAPI } from './queries';

const reducerName = 'notifications';
export const initialState: IReduxNotification.InitialState = {
  list: [],
  filters: {} as NotificationsFiltersPayload,
};

export const notificationsSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    setFilters: (
      state,
      { payload }: { payload: Partial<NotificationsFiltersPayload> },
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
      notificationsAPI.endpoints.getNotifications.matchFulfilled,
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
      notificationsAPI.endpoints.deleteNotification.matchFulfilled,
      (state, { payload }: { payload: Pick<INotification, 'id'> }) => {
        state.list = state.list?.filter(notif => notif?.id !== payload?.id);
      },
    );
  },
});

export const { setFilters, resetFilters } = notificationsSlice.actions;

export const notificationsSliceReducer = {
  [reducerName]: notificationsSlice.reducer,
};
