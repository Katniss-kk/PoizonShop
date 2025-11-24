import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import { productsReducer } from './slices/productsSlice';
import { filterReducer } from './slices/filterProductsSlice';
import { orderReducer } from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filter: filterReducer,
    order: orderReducer,
  },
  //   devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
