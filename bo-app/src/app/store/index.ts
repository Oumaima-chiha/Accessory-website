import type { AnyAction, Reducer } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combinedMiddleware, combinedReducer } from './reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer: Reducer<IRootState, AnyAction> = (state, action) => {
  if (action.type === 'auth/logout') {
    storage.removeItem('persist:root');
    state = {} as IRootState;
  }
  return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      combinedMiddleware,
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

export type IRootState = ReturnType<typeof combinedReducer>;
export const persistor = persistStore(store);
export default store;
