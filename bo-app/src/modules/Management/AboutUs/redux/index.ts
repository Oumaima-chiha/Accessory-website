import { aboutUsQueryReducer } from './queries';
import { aboutUsSliceReducer } from './slice';

const combinedReducer = {
  ...aboutUsQueryReducer,
  ...aboutUsSliceReducer,
};

export * from './queries';
export * from './slice';
export default combinedReducer;
