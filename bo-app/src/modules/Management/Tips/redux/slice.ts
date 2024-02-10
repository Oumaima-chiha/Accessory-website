import { createSlice } from '@reduxjs/toolkit';
import { mergeArrays } from 'utils/functions';
import type { IReduxTip, ITip, TipsFiltersPayload } from '../interfaces';
import { tipsAPI } from './queries';

const reducerName = 'tips';
export const initialState: IReduxTip.InitialState = {
  list: [],
  filters: {} as TipsFiltersPayload,
};

export const tipsSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    setFilters: (
      state,
      { payload }: { payload: Partial<TipsFiltersPayload> },
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
      tipsAPI.endpoints.getTips.matchFulfilled,
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
      tipsAPI.endpoints.addTip.matchFulfilled,
      (state, { payload }) => {
        state.list.push(payload);
      },
    );
    builder.addMatcher(
      tipsAPI.endpoints.updateTip.matchFulfilled,
      (
        state,
        { payload }: { payload: Pick<IReduxTip.UpdateTipPayload, 'id'> },
      ) => {
        const tipToBeUpdated = state?.list?.findIndex(
          tip => tip?.id === payload?.id,
        );
        state.list[tipToBeUpdated] = {
          ...state.list[tipToBeUpdated],
          ...payload,
        };
      },
    );
    builder.addMatcher(
      tipsAPI.endpoints.deleteTip.matchFulfilled,
      (state, { payload }: { payload: Pick<ITip, 'id'> }) => {
        state.list = state.list?.filter(tip => tip?.id !== payload?.id);
      },
    );
    builder.addMatcher(
      tipsAPI.endpoints.approveDisapproveTip.matchFulfilled,
      (state, { payload }: { payload: ITip }) => {
        const tipToBeUpdated = state?.list?.findIndex(
          tipElement => tipElement?.id === payload?.id,
        );
        state.list[tipToBeUpdated] = {
          ...state.list[tipToBeUpdated],
          ...payload,
        };
      },
    );
  },
});

export const { setFilters, resetFilters } = tipsSlice.actions;

export const tipsSliceReducer = { [reducerName]: tipsSlice.reducer };
