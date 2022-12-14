import { Error } from 'mongoose';
import { IncomingHttpHeaders } from 'http';

import { ApiValidationError } from './api-validation-error';
import { IApiAuthError } from './api-auth-error';

export type ApiResponse<T> =
  | { isSuccess: boolean; content?: T; statusCode: number; headers?: IncomingHttpHeaders }
  | {
      isSuccess: boolean;
      content: Error | ApiValidationError | IApiAuthError;
      statusCode: number;
      headers?: IncomingHttpHeaders;
    };
