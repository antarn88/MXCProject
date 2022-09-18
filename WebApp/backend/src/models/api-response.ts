import { Error } from 'mongoose';

import { IApiHeaders } from './api-headers';
import { ApiValidationError } from './api-validation-error';
import { IApiAuthError } from './api-auth-error';

export type ApiResponse<T> =
  | { isSuccess: true; content?: T; statusCode: number; headers?: IApiHeaders }
  | {
      isSuccess: false;
      content: Error | ApiValidationError | IApiAuthError;
      statusCode: number;
      headers?: IApiHeaders;
    };
