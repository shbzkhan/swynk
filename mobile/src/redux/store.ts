import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from './slice/userSlice';
import { userApi } from './api/userApi';

export const store = configureStore({
  reducer: {
    auth: userReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(userApi.middleware)
});

setupListeners(store.dispatch);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
