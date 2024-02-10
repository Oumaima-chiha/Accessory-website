import { notificationsQueryReducer } from './queries';
import { notificationsSliceReducer } from './slice';

const combinedReducer = {
  ...notificationsQueryReducer,
  ...notificationsSliceReducer,
};

export * from './queries';
export * from './slice';
export default combinedReducer;
