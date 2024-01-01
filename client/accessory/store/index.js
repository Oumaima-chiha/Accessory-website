import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setupListeners } from '@reduxjs/toolkit/query';

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';


import { api } from '../services/api';
import useReducer  from './user';


// Secure storage
export const storage = AsyncStorage; 

const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  useReducer
});



const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: [ 'auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);




const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware);
    
    if (__DEV__) {
        const { logger } = require(`redux-logger`);
       
        middlewares.push(logger);
      }
    // if (__DEV__ && !process.env.JEST_WORKER_ID) {
    //   const createDebugger = require('redux-flipper').default;
    //   middlewares.push(createDebugger());
    // }

    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };