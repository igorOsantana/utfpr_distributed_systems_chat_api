import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  ApiException,
  INTERNAL_SERVER_ERROR_MESSAGE,
} from 'src/shared/exception.shared';
import { LoggerApi } from 'src/shared/logger.shared';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerApi) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = INTERNAL_SERVER_ERROR_MESSAGE;

    if (
      exception instanceof ApiException ||
      exception instanceof HttpException
    ) {
      status = exception.getStatus();
      message = exception.message;
    }

    this.logMessage(request, status, message, exception);

    response.status(status).json({
      status,
      message,
    });
  }

  private logMessage(
    request: any,
    status: number,
    message: string,
    exception: any,
  ) {
    const context = 'End Request';
    const body = `${request.method} ${request.path} STATUS=${status} MESSAGE=${message}`;

    if (status >= 500) {
      this.logger.error(context, body, exception.stack);
    } else {
      this.logger.warn(context, body);
    }
  }
}
