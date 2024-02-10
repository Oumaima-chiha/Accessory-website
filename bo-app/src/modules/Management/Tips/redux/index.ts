import { tipsQueryReducer } from './queries';
import { tipsSliceReducer } from './slice';

const combinedReducer = {
  ...tipsQueryReducer,
  ...tipsSliceReducer,
};

export * from './queries';
export * from './slice';
export default combinedReducer;
