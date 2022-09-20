import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { decodeToken, isExpired } from 'react-jwt';

import store from '../store/store';
import { logout as logoutAsyncThunk } from '../store/auth/auth-api';

export const requestWithAuthHeader = (options: AxiosRequestConfig): AxiosPromise => {
  const client = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  const accessToken = localStorage.getItem('accessToken') || '';
  const email = localStorage.getItem('email') || '';
  const decodedToken = decodeToken(accessToken);
  const isTokenExpired = isExpired(accessToken);

  if (accessToken && email && decodedToken && !isTokenExpired) {
    client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.location.href = '/login';
  }

  return client(options);
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem('email');
  localStorage.removeItem('accessToken');
  await store.dispatch(logoutAsyncThunk());
  window.location.href = '/login';
};
