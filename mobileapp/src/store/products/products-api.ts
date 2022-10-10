import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from 'react-native-dotenv';

import {IProduct} from '../../interfaces/products/product.interface';

export const getProducts = createAsyncThunk('products/getProducts', async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data.content.results as IProduct[];
});
