import {createSlice, ActionReducerMapBuilder} from '@reduxjs/toolkit';

import {IProduct} from '../../interfaces/products/product.interface';
import {IProductsState} from '../../interfaces/products/products-state.interface';
import {createProduct, deleteProduct, getProducts, updateProduct} from './products-api';

const initialState: IProductsState = {
  product: null,
  products: [],
  isLoading: false,
  error: {
    errorAtGetProducts: null,
    errorAtCreateProduct: null,
    errorAtUpdateProduct: null,
    errorAtDeleteProduct: null,
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IProductsState>) => {
    // GET PRODUCTS
    builder.addCase(getProducts.pending, (state: IProductsState) => {
      state.isLoading = true;
      state.error.errorAtGetProducts = null;
    });
    builder.addCase(getProducts.fulfilled, (state: IProductsState, {payload}: {payload: IProduct[]}) => {
      state.isLoading = false;
      state.products = payload;
    });
    builder.addCase(getProducts.rejected, (state: IProductsState, action) => {
      state.isLoading = false;
      state.error.errorAtGetProducts = action.error;
    });

    // UPDATE PRODUCT
    builder.addCase(updateProduct.pending, (state: IProductsState) => {
      state.isLoading = true;
      state.error.errorAtUpdateProduct = null;
    });
    builder.addCase(updateProduct.fulfilled, (state: IProductsState) => {
      state.isLoading = false;
    });
    builder.addCase(updateProduct.rejected, (state: IProductsState, action) => {
      state.isLoading = false;
      state.error.errorAtUpdateProduct = action.error;
    });

    // CREATE PRODUCT
    builder.addCase(createProduct.pending, (state: IProductsState) => {
      state.isLoading = true;
      state.error.errorAtCreateProduct = null;
    });
    builder.addCase(createProduct.fulfilled, (state: IProductsState) => {
      state.isLoading = false;
    });
    builder.addCase(createProduct.rejected, (state: IProductsState, action) => {
      state.isLoading = false;
      state.error.errorAtCreateProduct = action.error;
    });

    // DELETE PRODUCT
    builder.addCase(deleteProduct.pending, (state: IProductsState) => {
      state.isLoading = true;
      state.error.errorAtDeleteProduct = null;
    });
    builder.addCase(deleteProduct.fulfilled, (state: IProductsState) => {
      state.isLoading = false;
    });
    builder.addCase(deleteProduct.rejected, (state: IProductsState, action) => {
      state.isLoading = false;
      state.error.errorAtDeleteProduct = action.error;
    });
  },
});

export default productsSlice;
