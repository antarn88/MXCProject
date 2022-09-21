import axios, { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { decodeToken, isExpired } from 'react-jwt';

import store from '../store/store';
import { logout as logoutAsyncThunk } from '../store/auth/auth-api';

export const requestWithAuthHeader = (options: AxiosRequestConfig): AxiosPromise => {
  const client = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  const accessToken = localStorage.getItem('accessToken') || '';
  const decodedToken = decodeToken(accessToken);
  const isTokenExpired = isExpired(accessToken);

  if (accessToken && decodedToken && !isTokenExpired) {
    client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    logout();
    return client(options);
  }

  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        logout();
      }
    }
  );

  return client(options);
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem('email');
  localStorage.removeItem('accessToken');
  await store.dispatch(logoutAsyncThunk());
  window.location.href = '/login';
};
