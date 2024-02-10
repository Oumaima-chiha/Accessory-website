import { rolesQueryReducer } from './queries';
import { rolesSliceReducer } from './slice';

const combinedReducer = {
  ...rolesQueryReducer,
  ...rolesSliceReducer,
};

export * from './queries';
export * from './slice';
export default combinedReducer;
