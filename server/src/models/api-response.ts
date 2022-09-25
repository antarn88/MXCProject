import { Error } from 'mongoose';
import { IncomingHttpHeaders } from 'http';

import { ApiValidationError } from './api-validation-error';
import { IApiAuthError } from './api-auth-error';

export type ApiResponse<T> =
  | { isSuccess: true; content?: T; statusCode: number; headers?: IncomingHttpHeaders }
  | {
      isSuccess: false;
      content: Error | ApiValidationError | IApiAuthError;
      statusCode: number;
      headers?: IncomingHttpHeaders;
    };
