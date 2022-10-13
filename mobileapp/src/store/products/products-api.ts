import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from 'react-native-dotenv';

import {IProduct} from '../../interfaces/products/product.interface';

export const getProducts = createAsyncThunk('products/getProducts', async () => {
  const response = await axios.get(`${API_URL}/products`);
  await delay(3000);
  return response.data.content.results as IProduct[];
});

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
