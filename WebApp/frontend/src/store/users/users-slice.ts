import { createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { IUser } from '../../interfaces/users/user.interface';
import { IUsersState } from '../../interfaces/users/users-state.interface';
import { getUsers, createUser, updateUser, deleteUser } from './users-api';

const initialState: IUsersState = {
  user: null,
  users: [],
  isLoading: false,
  error: {
    errorAtGetUsers: null,
    errorAtCreateUser: null,
    errorAtUpdateUser: null,
    errorAtDeleteUser: null,
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<IUsersState>) => {
    // GET USERS
    builder.addCase(getUsers.pending, (state: IUsersState) => {
      state.isLoading = true;
      state.error.errorAtGetUsers = null;
    });
    builder.addCase(getUsers.fulfilled, (state: IUsersState, { payload }: { payload: IUser[] }) => {
      state.isLoading = false;
      state.users = payload;
    });
    builder.addCase(getUsers.rejected, (state: IUsersState, action) => {
      state.isLoading = false;
      state.error.errorAtGetUsers = action.error;
    });

    // CREATE USER
    builder.addCase(createUser.pending, (state: IUsersState) => {
      state.isLoading = true;
      state.error.errorAtCreateUser = null;
    });
    builder.addCase(createUser.fulfilled, (state: IUsersState) => {
      state.isLoading = false;
    });
    builder.addCase(createUser.rejected, (state: IUsersState, action) => {
      state.isLoading = false;
      state.error.errorAtCreateUser = action.error;
    });

    // UPDATE USER
    builder.addCase(updateUser.pending, (state: IUsersState) => {
      state.isLoading = true;
      state.error.errorAtUpdateUser = null;
    });
    builder.addCase(updateUser.fulfilled, (state: IUsersState) => {
      state.isLoading = false;
    });
    builder.addCase(updateUser.rejected, (state: IUsersState, action) => {
      state.isLoading = false;
      state.error.errorAtUpdateUser = action.error;
    });

    // DELETE USER
    builder.addCase(deleteUser.pending, (state: IUsersState) => {
      state.isLoading = true;
      state.error.errorAtDeleteUser = null;
    });
    builder.addCase(deleteUser.fulfilled, (state: IUsersState) => {
      state.isLoading = false;
    });
    builder.addCase(deleteUser.rejected, (state: IUsersState, action) => {
      state.isLoading = false;
      state.error.errorAtDeleteUser = action.error;
    });
  },
});

export default usersSlice;
