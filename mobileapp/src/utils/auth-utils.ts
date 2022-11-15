import axios, {AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse} from 'axios';
import {API_URL} from 'react-native-dotenv';
import jwt_decode from 'jwt-decode';

import store from '../store/store';
import {logout as logoutAsyncThunk, setAuthState} from '../store/auth/auth-api';
import {IDecodedToken} from '../interfaces/auth/decoded-token.interface';
import {IProduct} from '../interfaces/products/product.interface';
import {deleteDataFromLocalStorage, getDataFromLocalStorage, storeDataToLocalStorage} from './local-storage-utils';

// REQUEST WITH AUTH HEADER
export const requestWithAuthHeader = async (options: AxiosRequestConfig): Promise<AxiosPromise> => {
  const client = axios.create({baseURL: API_URL});
  const accessToken = await getTokenFromLocalStorage();
  const decodedToken = jwt_decode(accessToken) as IDecodedToken;
  const isTokenExpired = decodedToken?.exp * 1000 < Date.now();

  if (accessToken && decodedToken && !isTokenExpired) {
    client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    logout();
    return client(options);
  }

  client.interceptors.response.use(
    async (response: AxiosResponse): Promise<AxiosResponse> => {
      const {isLoggedIn} = store.getState().auth;
      if (!isLoggedIn && (await hasToken())) {
        setAuthStateFromToken();
      }
      return response;
    },
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        logout();
      }
    },
  );

  return client(options);
};

// LOGOUT
export const logout = async (): Promise<void> => {
  await removeTokenFromLocalStorage();
  await store.dispatch(logoutAsyncThunk());
};

export const setTokenToLocalStorage = async (accessToken: string): Promise<void> =>
  accessToken ? await storeDataToLocalStorage('accessToken', accessToken) : undefined;

export const removeTokenFromLocalStorage = async (): Promise<void> => await deleteDataFromLocalStorage('accessToken');
export const getTokenFromLocalStorage = async (): Promise<string> => (await getDataFromLocalStorage('accessToken')) || '';
export const hasToken = async (): Promise<boolean> => ((await getDataFromLocalStorage('accessToken')) ? true : false);

export const setAuthStateFromToken = (): void => {
  (async (): Promise<void> => {
    const accessToken = await getTokenFromLocalStorage();
    const decodedToken = jwt_decode(accessToken) as IDecodedToken;
    const userId = decodedToken?.sub;
    const response = await axios.get(`${API_URL}/users/${userId}`, {
      headers: {Authorization: `Bearer ${accessToken}`},
    });

    if (response.data.isSuccess) {
      const user = response.data.content as IProduct;
      await store.dispatch(setAuthState({accessToken, user}));
    }
  })();
};
