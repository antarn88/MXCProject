import { ValidationError } from 'class-validator';
import { Error } from 'mongoose';
import { IApiHeaders } from './api-headers';

export type ApiResponse<T> =
  | { isSuccess: true; content?: T; statusCode: number; headers?: IApiHeaders }
  | {
      isSuccess: false;
      content: Error | ValidationError;
      statusCode: number;
      headers?: IApiHeaders;
    };
