import { legalQueryReducer } from './queries';
import { legalSliceReducer } from './slice';

const combinedReducer = {
  ...legalQueryReducer,
  ...legalSliceReducer,
};

export * from './queries';
export * from './slice';
export default combinedReducer;
