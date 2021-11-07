import { combineReducers } from 'redux';
import { convexHullReducer } from './ConvexHullManagement/ConvexHullReducer';

export const rootReducer = combineReducers({
  convexHullReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
