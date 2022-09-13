import { SerializedError } from '@reduxjs/toolkit';

export interface IUserError {
  errorAtGetUsers: SerializedError | null;
  errorAtCreateUser: SerializedError | null;
  errorAtUpdateUser: SerializedError | null;
  errorAtDeleteUser: SerializedError | null;
}
