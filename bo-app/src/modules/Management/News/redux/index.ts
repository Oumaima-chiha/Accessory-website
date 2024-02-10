import { newsQueryReducer } from './queries';
import { newsSliceReducer } from './slice';

const combinedReducer = {
  ...newsQueryReducer,
  ...newsSliceReducer,
};

export * from './queries';
export * from './slice';
export default combinedReducer;
