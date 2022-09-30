import axios, { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { decodeToken, isExpired } from 'react-jwt';

import store from '../store/store';
import { logout as logoutAsyncThunk, setAuthState } from '../store/auth/auth-api';
import { IUser } from '../interfaces/users/user.interface';
import { IDecodedToken } from '../interfaces/auth/decoded-token.interface';

// REQUEST WITH AUTH HEADER
export const requestWithAuthHeader = (options: AxiosRequestConfig): AxiosPromise => {
  const client = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  const accessToken = getTokenFromLocalStorage();
  const decodedToken = decodeToken(accessToken) as IDecodedToken;
  const isTokenExpired = isExpired(accessToken);

  if (accessToken && decodedToken && !isTokenExpired) {
    client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    logout();
    return client(options);
  }

  client.interceptors.response.use(
    async (response: AxiosResponse): Promise<AxiosResponse> => {
      const { isLoggedIn } = store.getState().auth;
      if (!isLoggedIn && hasToken()) {
        setAuthStateFromToken();
      }
      return response;
    },
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        logout();
      }
    }
  );

  return client(options);
};

// LOGOUT
export const logout = async (): Promise<void> => {
  removeTokenFromLocalStorage();
  await store.dispatch(logoutAsyncThunk());
  goToLoginPage();
};

export const setTokenToLocalStorage = (accessToken: string): void =>
  accessToken ? localStorage.setItem('accessToken', accessToken) : undefined;

export const removeTokenFromLocalStorage = (): void => localStorage.removeItem('accessToken');
export const getTokenFromLocalStorage = (): string => localStorage.getItem('accessToken') || '';
export const hasToken = (): boolean => (localStorage.getItem('accessToken') ? true : false);
export const goToLoginPage = (): string => (window.location.href = '/login');

export const setAuthStateFromToken = (): void => {
  (async (): Promise<void> => {
    const accessToken = getTokenFromLocalStorage();
    const decodedToken = decodeToken(accessToken) as IDecodedToken;
    const userId = decodedToken.sub;
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.data.isSuccess) {
      const user = response.data.content as IUser;
      await store.dispatch(setAuthState({ accessToken, user }));
    }
  })();
};
