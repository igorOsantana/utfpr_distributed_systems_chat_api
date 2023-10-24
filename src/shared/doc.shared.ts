import { HttpStatus } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  ApiErrorRequestItemResponse,
  createApiDocs,
} from 'src/shared/decorator.shared';

export const InternalServerErrorResponseDoc = createApiDocs(
  ApiErrorRequestItemResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
    error:
      'The server encountered an error and could not complete your request',
  }),
);

export const UnauthorizedResponseDoc = createApiDocs(
  ApiBearerAuth(),
  ApiErrorRequestItemResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Request user unauthorized.',
    error: 'You are not authorized',
  }),
);
