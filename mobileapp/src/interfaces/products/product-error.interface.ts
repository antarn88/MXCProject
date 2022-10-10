import {SerializedError} from '@reduxjs/toolkit';

export interface IProductError {
  errorAtGetProducts: SerializedError | null;
  errorAtCreateProduct: SerializedError | null;
  errorAtUpdateProduct: SerializedError | null;
  errorAtDeleteProduct: SerializedError | null;
}
