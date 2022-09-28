import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const GLOBAL_VALIDATION_PIPE: ValidationPipe = new ValidationPipe({
  exceptionFactory: (validationErrors: ValidationError[] = []): BadRequestException => {
    const errors = {
      statusCode: 400,
      messages: validationErrors.map((error: ValidationError) => ({
        label: Object.values(error.constraints).pop(),
        formProperty: error.property,
      })),
    };
    return new BadRequestException({
      isSuccess: false,
      content: errors,
      statusCode: 400,
    });
  },
});

export const PASSWORD_VALIDATION_PATTERN = /^(?=[^a-zíáéüűúöőó]*[a-zíáéüűúöőó])(?=[^A-ZÍÁÉÜŰÚÖŐÓ]*[A-ZÍÁÉÜŰÚÖŐÓ]).{2,}$/;

export const PASSWORD_VALIDATION_MSG = {
  message: 'password must contain at least 1 lowercase and 1 uppercase letter',
};
