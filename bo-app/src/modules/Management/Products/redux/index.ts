import { productApiReducer } from './queries';
import { productReducer } from './slice';

const combinedReducer = {
  ...productApiReducer,
  ...productReducer,
};

export * from './queries';
export * from './slice';
export default combinedReducer;
