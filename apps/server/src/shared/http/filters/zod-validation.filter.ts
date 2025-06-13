import {
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ZodValidationException } from 'nestjs-zod';
import { fromZodError } from 'zod-validation-error';

@Catch(ZodValidationException)
export class ZodValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ZodValidationException) {
    const zodError = exception.getZodError();
    throw new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Please provide a valid input for this action.',
      code: 'VALIDATION_INPUT',
      errors: fromZodError(zodError).details.map(({ message, path }) => ({
        message,
        path: path.join('.'),
      })),
    });
  }
}

export class InputErrorResponse {
  @ApiProperty({ example: '<message input error>' })
  message: string;

  @ApiProperty({ example: '<location input error>' })
  path: string;
}

export class ValidationInputResponse {
  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode: HttpStatus;

  @ApiProperty({ example: 'Please provide a valid input for this action.' })
  message: string;

  @ApiProperty({ example: 'VALIDATION_INPUT' })
  code: string;

  @ApiProperty({ type: InputErrorResponse, isArray: true })
  errors: InputErrorResponse[];
}
