import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { IUser } from '../../interfaces/users/user.interface';

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
  return response.data as IUser[];
});

export const getOneUser = createAsyncThunk('users/getOneUser', async (id: string | number) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`);
  return response.data as IUser;
});

export const createUser = createAsyncThunk('users/createUser', async (user: IUser) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/users`, user);
  return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async (user: IUser) => {
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/${user.id}`, user);
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string | number) => {
  const response = await axios.delete(`${process.env.REACT_APP_API_URL}/users/${id}`);
  return response.data;
});
