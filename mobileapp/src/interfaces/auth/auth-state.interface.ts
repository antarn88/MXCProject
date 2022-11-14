import {SerializedError} from '@reduxjs/toolkit';
import {IUser} from './user.interface';

export interface IAuthState {
  accessToken: string | null;
  loggedInUser: IUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: SerializedError | null;
}
