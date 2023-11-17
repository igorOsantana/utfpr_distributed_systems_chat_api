import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const INTERNAL_SERVER_ERROR_MESSAGE =
  'The server encountered an error and could not complete your request';

export class ApiException extends HttpException {
  readonly DEFAULT_ID = '@API_EXCEPTIONS';
  readonly RESOURCE_ID = null;

  constructor(id?: string, message?: string, status?: HttpStatus) {
    super(
      message || INTERNAL_SERVER_ERROR_MESSAGE,
      status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
    this.RESOURCE_ID = id || this.DEFAULT_ID;
  }

  private logError(...err: unknown[]) {
    const sanitizeErrors = err.filter(Boolean);

    if (sanitizeErrors.length > 0) {
      console.error(sanitizeErrors);
    }
  }

  private static isApiException(err: unknown): err is ApiException {
    return err instanceof ApiException;
  }

  static isOwnException(err: unknown, id: string): boolean {
    if (!ApiException.isApiException(err)) {
      return false;
    }

    return err.RESOURCE_ID === id;
  }

  internal(service: string, err?: unknown) {
    this.logError(`INTERNAL SERVER ERROR ON ${service}`, err);
    const message =
      'The server encountered an error and could not complete your request';
    return new ApiException(
      this.DEFAULT_ID,
      message,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  notFound(id: string, message: string, err?: unknown) {
    this.logError(err);
    return new ApiException(id, message, HttpStatus.NOT_FOUND);
  }

  badRequest(id: string, message: string, err?: unknown) {
    this.logError(err);
    return new ApiException(id, message, HttpStatus.BAD_REQUEST);
  }

  conflict(id: string, message: string, err?: unknown) {
    this.logError(err);
    return new ApiException(id, message, HttpStatus.CONFLICT);
  }

  unauthorized(id: string, message: string, err?: unknown) {
    this.logError(err);
    return new ApiException(id, message, HttpStatus.UNAUTHORIZED);
  }

  forbidden(id: string, message: string, err?: unknown) {
    this.logError(err);
    return new ApiException(id, message, HttpStatus.FORBIDDEN);
  }
}

export class ValidationException extends ApiException {
  constructor(validationErrors: ValidationError[]) {
    const formattedErrors = validationErrors.map((error) => {
      const constraints = Object.values(error.constraints);
      return constraints.join(', ');
    });
    super(
      '@VALIDATION_EXCEPTIONS',
      formattedErrors.join(', '),
      HttpStatus.BAD_REQUEST,
    );
  }
}
