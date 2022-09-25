import axios, { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { decodeToken, isExpired } from 'react-jwt';

import store from '../store/store';
import { logout as logoutAsyncThunk, setLoggedInUser } from '../store/auth/auth-api';
import { IUser } from '../interfaces/users/user.interface';

// REQUEST WITH AUTH HEADER
export const requestWithAuthHeader = (options: AxiosRequestConfig): AxiosPromise => {
  const client = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  const accessToken = getAccessTokenFromLocalStorage();
  const decodedToken = decodeToken(accessToken) as { exp: number; iat: number; sub: string; username: string }; //TODO kiszervezni!
  const isTokenExpired = isExpired(accessToken);

  if (accessToken && decodedToken && !isTokenExpired) {
    client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    logout();
    return client(options);
  }

  client.interceptors.response.use(
    async (response: AxiosResponse) => {
      const { isLoggedIn } = store.getState().auth;

      // Set user to auth state
      if (!isLoggedIn) {
        const userId = decodedToken.sub;
        const resp = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (resp.data.isSuccess) {
          const user = resp.data.content as IUser;
          await store.dispatch(setLoggedInUser({ accessToken, user }));
        }
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
  await store.dispatch(logoutAsyncThunk());
};

export const setUserToLocalStorage = (accessToken: string): void =>
  accessToken ? localStorage.setItem('accessToken', accessToken) : undefined;
export const removeUserFromLocalStorage = (): void => localStorage.removeItem('accessToken');
export const getAccessTokenFromLocalStorage = (): string => localStorage.getItem('accessToken') || '';
export const hasAccessToken = (): boolean => (localStorage.getItem('accessToken') ? true : false);
export const goToLoginPage = (): string => (window.location.href = '/login');
