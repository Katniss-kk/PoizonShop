import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IProduct } from '../../component/types';

interface ProductsState {
  products: IProduct[];
  minPrice: string;
  maxprice: string;
  brands: string[];
  sizes: number[];
  filterProducts?: IProduct[] | null;
  selectedMinPrice?: string;
  selectedMaxPrice?: string;
  selectedBrands?: string[] | null;
  selectedSizes?: string[] | null;
}

const initialState: ProductsState = {
  products: [],
  minPrice: '',
  maxprice: '',
  brands: [],
  sizes: [],
  filterProducts: null,
  selectedMinPrice: '',
  selectedMaxPrice: '',
  selectedBrands: null,
  selectedSizes: null,
};

export const getFilterProductsData = createAsyncThunk(
  'filter/getFilterProductsData',
  (_, { getState }) => {
    const state = getState() as { filter: ProductsState };
    const {
      products,
      selectedMinPrice,
      selectedMaxPrice,
      selectedBrands,
      selectedSizes,
    } = state.filter;

    if (products.length === 0) {
      return [];
    }

    const safeSelectedBrands = selectedBrands || [];
    const safeSelectedSizes = selectedSizes || [];

    const minPriceSelected =
      typeof selectedMinPrice === 'string'
        ? Number(selectedMinPrice.replace(/\./g, ''))
        : Number(selectedMinPrice) || 0;

    const maxPriceSelected =
      typeof selectedMaxPrice === 'string'
        ? Number(selectedMaxPrice.replace(/\./g, ''))
        : Number(selectedMaxPrice) || Infinity;

    const filteredProducts = products.filter(product => {
      const productPrice = Number(product.price.replace(/\./g, ''));

      const brandMatch =
        safeSelectedBrands.length === 0 ||
        safeSelectedBrands.includes(product.brand);

      const sizeMatch =
        safeSelectedSizes.length === 0 ||
        safeSelectedSizes.some(selectedSize => {
          const sizeNum = Number(selectedSize);
          return Array.isArray(product.size)
            ? (product.size as number[]).includes(sizeNum)
            : product.size === sizeNum;
        });

      const priceMatch =
        productPrice >= minPriceSelected && productPrice <= maxPriceSelected;

      return brandMatch && sizeMatch && priceMatch;
    });

    return filteredProducts;
  }
);

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setProductsData: (state, action) => {
      state.products = action.payload;
    },
    setBrandsAndSizes: (state, action) => {
      state.brands = [];
      state.sizes = [];

      action.payload.forEach((item: { brand: string; size: number[] }) => {
        if (item.brand && !state.brands.includes(item.brand)) {
          state.brands.push(item.brand);
        }
        if (Array.isArray(item.size)) {
          item.size.forEach(singleSize => {
            if (!state.sizes.includes(singleSize)) {
              state.sizes.push(singleSize);
            }
          });
        }
      });
      state.sizes.sort((a, b) => a - b);
    },
    clearAllFiltersData: state => {
      state.filterProducts = state.products;
      state.selectedMinPrice = '';
      state.selectedMaxPrice = '';
      state.selectedBrands = null;
      state.selectedSizes = null;
    },
    setMinPriceData: (state, action) => {
      state.selectedMinPrice = action.payload;
    },
    setMaxPriceData: (state, action) => {
      state.selectedMaxPrice = action.payload;
    },
    setBrandsData: (state, action) => {
      state.selectedBrands = action.payload;
    },
    setSizesData: (state, action) => {
      state.selectedSizes = action.payload;
    },
    setFilterProducts: state => {
      state.filterProducts = state.products;
    },
  },
  extraReducers(builder) {
    builder.addCase(getFilterProductsData.fulfilled, (state, action) => {
      state.filterProducts = action.payload;
    });
  },
});

export const {
  setProductsData,
  clearAllFiltersData,
  setMinPriceData,
  setMaxPriceData,
  setBrandsData,
  setSizesData,
  setBrandsAndSizes,
  setFilterProducts,
} = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
