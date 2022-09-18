import { ApiValidationErrorMessage } from './api-validation-error-message';

export interface ApiValidationError {
  statusCode: number;
  messages: ApiValidationErrorMessage[];
}
