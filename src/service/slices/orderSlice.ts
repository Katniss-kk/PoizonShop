import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { IProduct } from '../../component/types';

interface OrderState {
  product: IProduct | null;
  size: string | number | null;
  howBuy: string;
  address: string;
  contacts: string;
  number: string;
  errors: {
    size: boolean;
    howBuy: boolean;
    address: boolean;
    contacts: boolean;
    number: boolean;
  };
}

const initialState: OrderState = {
  product: null,
  size: null,
  howBuy: '',
  address: '',
  contacts: '',
  number: '',
  errors: {
    size: false,
    howBuy: false,
    address: false,
    contacts: false,
    number: false,
  },
};

const orderValidation = (state: OrderState) => {
  const errors = {
    size: false,
    howBuy: false,
    address: false,
    contacts: false,
    number: false,
  };

  if (state.product?.size && state.product.size.length > 0) {
    errors.size = !state.size;
  }

  errors.howBuy = !state.howBuy.trim();
  errors.address = !state.address.trim();
  errors.contacts = !state.contacts.trim();
  errors.number = !state.number.trim();

  return errors;
};

export const validateAndPushOrder = createAsyncThunk(
  'order/validateAndPushOrder',
  async (_, { getState, dispatch }) => {
    const state = getState() as { order: OrderState };
    const currentState = state.order;

    const errors = orderValidation(currentState);
    dispatch(setErrors(errors));

    const hasErrors = Object.values(errors).some(error => error);

    if (!hasErrors) {
      console.log('Заказ успешно оформлен', currentState);
      return true;
    }

    return false;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<IProduct>) => {
      state.product = action.payload;
    },
    setSizeState: (state, action: PayloadAction<string | number>) => {
      state.size = action.payload;
    },
    setHowBuy: (state, action: PayloadAction<string>) => {
      state.howBuy = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setContacts: (state, action: PayloadAction<string>) => {
      state.contacts = action.payload;
    },
    setNumber: (state, action: PayloadAction<string>) => {
      state.number = action.payload;
    },
    setErrors: (state, action: PayloadAction<OrderState['errors']>) => {
      state.errors = action.payload;
    },
    resetOrder: state => {
      state.product = null;
      state.size = null;
      state.howBuy = '';
      state.address = '';
      state.contacts = '';
      state.number = '';
      state.errors = {
        size: false,
        howBuy: false,
        address: false,
        contacts: false,
        number: false,
      };
    },
  },
});

export const {
  setProduct,
  setSizeState,
  setHowBuy,
  setAddress,
  setContacts,
  setNumber,
  setErrors,
  resetOrder,
} = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
