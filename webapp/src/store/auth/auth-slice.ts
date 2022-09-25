import { createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { IAuthState } from '../../interfaces/auth/auth-state.interface';
import { ILoggedInUserData } from '../../interfaces/auth/logged-in-user-data.interface';
import { ILoginResponse } from '../../interfaces/auth/login-response.interface';
import { goToLoginPage, removeUserFromLocalStorage, setUserToLocalStorage } from '../../utils/auth-utils';
import { login, logout, setLoggedInUser } from './auth-api';

const initialState: IAuthState = {
  accessToken: null,
  loggedInUser: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IAuthState>) => {
    // LOGIN
    builder.addCase(login.pending, (state: IAuthState) => {
      state.isLoading = true;
      state.isLoggedIn = false;
      removeUserFromLocalStorage();
    });
    builder.addCase(login.fulfilled, (state: IAuthState, { payload }: { payload: ILoginResponse }) => {
      state.isLoggedIn = true;
      state.isLoading = false;
      state.accessToken = payload.content.accessToken;
      state.loggedInUser = payload.content.user;
      state.error = null;

      if (state.accessToken) {
        setUserToLocalStorage(state.accessToken);
      }
    });
    builder.addCase(login.rejected, (state: IAuthState, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // LOGOUT
    builder.addCase(logout.fulfilled, (state: IAuthState) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.accessToken = null;
      state.loggedInUser = null;
      removeUserFromLocalStorage();
      goToLoginPage();
    });

    // SET LOGGED IN USER
    builder.addCase(setLoggedInUser.fulfilled, (state: IAuthState, { payload }: { payload: ILoggedInUserData }) => {
      state.isLoggedIn = true;
      state.accessToken = payload.accessToken;
      state.loggedInUser = payload.user;
    });
  },
});

export default authSlice;
