import { IApiError } from './api-error';
import { IApiHeaders } from './api-headers';

export type ApiResponse<T> =
  | { isSuccess: true; content?: T; statusCode: number; headers?: IApiHeaders }
  | {
      isSuccess: false;
      content: IApiError;
      statusCode: number;
      headers?: IApiHeaders;
    };
