import { createSlice } from '@reduxjs/toolkit';
import { mergeArrays } from 'utils/functions';
import type {
  AboutUsFiltersPayload,
  IAboutUs,
  IReduxAboutUs,
} from '../interfaces';
import { aboutUsAPI } from './queries';

const reducerName = 'aboutUs';
export const initialState: IReduxAboutUs.InitialState = {
  list: [],
  filters: {} as AboutUsFiltersPayload,
};

export const aboutUsSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    setFilters: (
      state,
      { payload }: { payload: Partial<AboutUsFiltersPayload> },
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
      aboutUsAPI.endpoints.getAboutUs.matchFulfilled,
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
      aboutUsAPI.endpoints.addAboutUs.matchFulfilled,
      (state, { payload }) => {
        state.list.push(payload);
      },
    );
    builder.addMatcher(
      aboutUsAPI.endpoints.updateAboutUs.matchFulfilled,
      (
        state,
        {
          payload,
        }: { payload: Pick<IReduxAboutUs.UpdateAboutUsPayload, 'id'> },
      ) => {
        const aboutUsToBeUpdated = state?.list?.findIndex(
          aboutUs => aboutUs?.id === payload?.id,
        );
        state.list[aboutUsToBeUpdated] = {
          ...state.list[aboutUsToBeUpdated],
          ...payload,
        };
      },
    );
    builder.addMatcher(
      aboutUsAPI.endpoints.deleteAboutUs.matchFulfilled,
      (state, { payload }: { payload: Pick<IAboutUs, 'id'> }) => {
        state.list = state.list?.filter(aboutUs => aboutUs?.id !== payload?.id);
      },
    );
    builder.addMatcher(
      aboutUsAPI.endpoints.approveDisapproveAboutUs.matchFulfilled,
      (state, { payload }: { payload: IAboutUs }) => {
        const elementToBeUpdated = state?.list?.findIndex(
          aboutUsElement => aboutUsElement?.id === payload?.id,
        );
        state.list[elementToBeUpdated] = {
          ...state.list[elementToBeUpdated],
          ...payload,
        };
      },
    );
  },
});

export const { setFilters, resetFilters } = aboutUsSlice.actions;

export const aboutUsSliceReducer = { [reducerName]: aboutUsSlice.reducer };
