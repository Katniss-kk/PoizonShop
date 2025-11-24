import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IProduct } from '../../component/types';
import { productsApi } from '../../api/productsApi';

interface ProductState {
  products: IProduct[];
  selectedProduct: IProduct | null;
  productsShoes: IProduct[];
  productsCloth: IProduct[];
  productsAcs: IProduct[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  productsShoes: [],
  productsCloth: [],
  productsAcs: [],
  loading: false,
  error: null,
};

export const fetchProductsThunk = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const products = await productsApi.getAllProducts();
      return products;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error occurred'
      );
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    categorizeProducts: state => {
      state.productsShoes = state.products.filter(
        product => product.type === 'Обувь'
      );
      state.productsCloth = state.products.filter(
        product => product.type === 'Одежда'
      );
      state.productsAcs = state.products.filter(
        product => product.type === 'Аксессуары'
      );
    },
    getProductByTitle: (state, action) => {
      const product = state.products.find(item => 
        item.title.toLowerCase() === action.payload.toLowerCase()
      );
      state.selectedProduct = product || null;
      state.error = product ? null : 'Товар не найден';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProductsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;

        state.productsShoes = action.payload.filter(
          product => product.type === 'Обувь'
        );
        state.productsCloth = action.payload.filter(
          product => product.type === 'Одежда'
        );
        state.productsAcs = action.payload.filter(
          product => product.type === 'Аксессуары'
        );
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, categorizeProducts, getProductByTitle } =
  productsSlice.actions;
export const productsReducer = productsSlice.reducer;
