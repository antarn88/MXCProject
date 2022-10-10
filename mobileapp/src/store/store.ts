import {configureStore, ThunkMiddleware} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import reduxThunk from 'redux-thunk';
import type {TypedUseSelectorHook} from 'react-redux';

import productsSlice from './products/products-slice';

let middlewares: ThunkMiddleware[] = [reduxThunk];

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(...middlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
