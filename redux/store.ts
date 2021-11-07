import { configureStore, DeepPartial } from '@reduxjs/toolkit';
import { rootReducer, RootState } from './index';

function configureAppStore(preloadedState?: DeepPartial<RootState> | any) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
const store = configureAppStore();

export default store;
