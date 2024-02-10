import { faqsQueryReducer } from './queries';
import { faqsSliceReducer } from './slice';

const combinedReducer = {
  ...faqsQueryReducer,
  ...faqsSliceReducer,
};

export * from './queries';
export * from './slice';
export default combinedReducer;
