import { SerializedError } from '@reduxjs/toolkit';
import { ILoginResponse } from './login-response.interface';

export interface IAuthState {
  authData: ILoginResponse;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: SerializedError | null;
}
