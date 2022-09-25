import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { useSelector } from 'react-redux';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';
import type { TypedUseSelectorHook } from 'react-redux';

import usersSlice from './users/users-slice';
import authSlice from './auth/auth-slice';

// MIDDLEWARES
let middlewares: ThunkMiddleware[] = [reduxThunk];

if (process.env.NODE_ENV === 'development') {
  middlewares = [...middlewares, logger];
}

// STORE
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    users: usersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
