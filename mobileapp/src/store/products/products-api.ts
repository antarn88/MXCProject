import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from 'react-native-dotenv';

import {IPageOptions} from '../../interfaces/page-options.interface';
import {IProduct} from '../../interfaces/products/product.interface';

export const getProducts = createAsyncThunk('products/getProducts', async (pageOptions: IPageOptions) => {
  const orderBy = pageOptions.orderBy;
  const order = pageOptions.order;
  const pageIndex = pageOptions.pageIndex + 1;
  const limit = pageOptions.limit;

  const response = await axios.get(`${API_URL}/products?orderBy=${orderBy}&order=${order}&pageIndex=${pageIndex}&limit=${limit}`);
  // await sleep(500);
  return response.data.content.results as IProduct[];
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (product: IProduct) => {
  const response = await axios.put(`${API_URL}/products/${product.id}`, product);
  return response.data;
});

export const createProduct = createAsyncThunk('products/createProduct', async (product: IProduct) => {
  const response = await axios.post(`${API_URL}/products`, product);
  return response.data.content;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: string) => {
  const response = await axios.delete(`${API_URL}/products/${id}`);
  // await sleep(5000);
  return response.data;
});

// const sleep = (time: number): Promise<void> => new Promise<void>((resolve) => setTimeout(resolve, time));
