import { SerializedError } from '@reduxjs/toolkit';

export interface IUserError {
  errorAtGetUsers: SerializedError | null;
  errorAtGetOneUser: SerializedError | null;
  errorAtCreateUser: SerializedError | null;
  errorAtUpdateUser: SerializedError | null;
  errorAtDeleteUser: SerializedError | null;
}
