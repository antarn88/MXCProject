import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ILoginResponse } from '../../interfaces/auth/login-response.interface';
import { ILoginRequest } from '../../interfaces/auth/login-request.interface';

export const login = createAsyncThunk('auth/login', async (loginData: ILoginRequest): Promise<ILoginResponse> => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
    username: loginData.username,
    password: loginData.password,
  });
  return response.data as ILoginResponse;
});

export const logout = createAsyncThunk('auth/logout', async (): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, 0));
});
