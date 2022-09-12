import { Error } from 'mongoose';
import { IApiHeaders } from './api-headers';

export type ApiResponse<T> =
  | { isSuccess: true; content?: T; statusCode: number; headers?: IApiHeaders }
  | {
      isSuccess: false;
      content: Error;
      statusCode: number;
      headers?: IApiHeaders;
    };
