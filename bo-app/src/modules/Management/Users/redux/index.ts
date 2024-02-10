import { usersQueryReducer } from './queries';
import { usersSliceReducer } from './slice';

const combinedReducer = {
  ...usersQueryReducer,
  ...usersSliceReducer,
};

export * from './queries';
export * from './slice';
export default combinedReducer;
