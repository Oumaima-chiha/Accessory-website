import { feedbackQueryReducer } from './queries';
import { feedbackSliceReducer } from './slice';

const combinedReducer = {
  ...feedbackQueryReducer,
  ...feedbackSliceReducer,
};

export * from './queries';
export * from './slice';
export default combinedReducer;
