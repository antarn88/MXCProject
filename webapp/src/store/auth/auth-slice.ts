import { createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { IAuthState } from '../../interfaces/auth/auth-state.interface';
import { ILoginResponse } from '../../interfaces/auth/login-response.interface';
import { login, logout } from './auth-api';

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
    });
    builder.addCase(login.fulfilled, (state: IAuthState, { payload }: { payload: ILoginResponse }) => {
      state.isLoggedIn = true;
      state.isLoading = false;
      state.accessToken = payload.content.accessToken;
      state.loggedInUser = payload.content.user;
      state.error = null;
    });
    builder.addCase(login.rejected, (state: IAuthState, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // LOGOUT
    builder.addCase(logout.pending, (state: IAuthState) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state: IAuthState) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.accessToken = null;
      state.loggedInUser = null;
    });
    builder.addCase(logout.rejected, (state: IAuthState, action) => {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export default authSlice;
