import { HttpStatus } from '@/constants/httpStatus';
import type { HttpStatusType } from '@/constants/httpStatus';

export class AppError extends Error {
  public statusCode: HttpStatusType;

  constructor(message: string, statusCode: HttpStatusType) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Validation Error') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Not Found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class ExternalApiError extends AppError {
  constructor(message: string = 'External API Error') {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
