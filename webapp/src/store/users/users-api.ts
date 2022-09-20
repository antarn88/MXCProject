import { createAsyncThunk } from '@reduxjs/toolkit';

import { IUser } from '../../interfaces/users/user.interface';
import { IPageOptions } from '../../interfaces/page-options.interface';
import { requestWithAuthHeader } from '../../utils/auth-utils';

export const getUsers = createAsyncThunk('users/getUsers', async (pageOptions: IPageOptions) => {
  const orderBy = pageOptions.orderBy;
  const order = pageOptions.order;
  const pageIndex = pageOptions.pageIndex + 1;
  const limit = pageOptions.limit;

  const response = await requestWithAuthHeader({
    url: `/users?orderBy=${orderBy}&order=${order}&pageIndex=${pageIndex}&limit=${limit}`,
    method: 'get',
  });
  return response.data.content.results as IUser[];
});

export const createUser = createAsyncThunk('users/createUser', async (user: IUser) => {
  const response = await requestWithAuthHeader({ url: '/users', method: 'post', data: user });
  return response.data.content;
});

export const updateUser = createAsyncThunk('users/updateUser', async (user: IUser) => {
  const response = await requestWithAuthHeader({ url: `/users/${user.id}`, method: 'put', data: user });
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string | number) => {
  const response = await requestWithAuthHeader({ url: `/users/${id}`, method: 'delete' });
  return response.data;
});
