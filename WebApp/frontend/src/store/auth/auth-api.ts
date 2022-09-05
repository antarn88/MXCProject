import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ILoginResponse } from '../../interfaces/auth/login-response.interface';
import { ILoginRequest } from '../../interfaces/auth/login-request.interface';

export const login = createAsyncThunk('auth/login', async (loginData: ILoginRequest) => {
  const getUserResponse = await axios.get(`${process.env.REACT_APP_API_URL}/users?username=${loginData.username}`);

  const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
    email: getUserResponse.data[0].email,
    password: loginData.password,
  });
  return response.data as ILoginResponse;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  return new Promise((resolve) => setTimeout(resolve, 300));
});