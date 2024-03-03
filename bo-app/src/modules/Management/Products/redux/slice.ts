import { createSlice } from '@reduxjs/toolkit';

import { productApi } from './queries';
import type { IReduxJewelry } from '../interfaces/product';
import _ from 'lodash';

const reducerName = 'product';
export const initialState: IReduxJewelry.InitialState = {
  list: [],
  // filters: {} as ProductsFiltersPayload,
};

export const productsSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    // setFilters: (
    //   state,
    //   { payload }: { payload: Partial<ProductsFiltersPayload> },
    // ) => {
    //   state.filters = {
    //     ...state.filters,
    //     ...payload,
    //   };
    // },
    // resetFilters: state => {
    //   state.filters = initialState.filters;
    // },
  },
  extraReducers: builder => {
    builder.addMatcher(
      productApi.endpoints?.getProducts.matchFulfilled,
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
    builder.addMatcher(productApi.endpoints?.addJewelry.matchFulfilled, state => {
      state.list = [];
    });
    builder.addMatcher(
      productApi.endpoints?.updateJewelry.matchFulfilled,
      (
        state,
        {
          payload,
        }: {
          payload: {
            success: boolean;
            jewelry: Pick<IReduxJewelry.UpdateJewelryPayload, 'id'>;
          };
        },
      ) => {
        const jewelryToBeUpdated = state?.list?.findIndex(
          jewelry => jewelry?.id === payload?.jewelry.id,
        );
        state.list[jewelryToBeUpdated] = {
          ...state.list[jewelryToBeUpdated],
          ...payload.jewelry,
        };
      },
    );
  
    // builder.addMatcher(
    //   productApi.endpoints.deleteJewelry.matchFulfilled,
    //   (state, { payload }: { payload: Pick<IUser, 'id'> }) => {
    //     state.list = state.list?.filter(user => user?.id !== payload?.id);
    //   },
    // );
  },
});

// export const { setFilters, resetFilters } = productsSlice.actions:
export const productReducer = { [reducerName]: productsSlice.reducer };
