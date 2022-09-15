import { Error } from 'mongoose';

import { IApiHeaders } from './api-headers';
import { ApiValidationError } from './api-validation-error';

export type ApiResponse<T> =
  | { isSuccess: true; content?: T; statusCode: number; headers?: IApiHeaders }
  | {
      isSuccess: false;
      content: Error | ApiValidationError;
      statusCode: number;
      headers?: IApiHeaders;
    };
