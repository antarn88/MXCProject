import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const GLOBAL_VALIDATION_PIPE = new ValidationPipe({
  exceptionFactory: (validationErrors: ValidationError[] = []) => {
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
