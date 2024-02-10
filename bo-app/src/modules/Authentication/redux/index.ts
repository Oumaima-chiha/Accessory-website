import { authQueryReducer } from './auth.query';
import { authSliceReducer } from './auth.slice';

const combinedReducer = {
  ...authQueryReducer,
  ...authSliceReducer,
};

export * from './auth.query';
export * from './auth.slice';
export default combinedReducer;
