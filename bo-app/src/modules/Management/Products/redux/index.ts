import { boUsersQueryReducer } from './queries';
import { boUsersSliceReducer } from './slice';

const combinedReducer = {
  ...boUsersQueryReducer,
  ...boUsersSliceReducer,
};

export * from './queries';
export * from './slice';
export default combinedReducer;
