import {
  createParamDecorator,
  ExecutionContext,
  HttpStatus,
  Type,
} from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';

export type TApiSuccessRequestItemResponseProps = {
  model: Type<any>;
  description: string;
  entity: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  status: HttpStatus;
};

export const ApiSuccessRequestItemResponse = ({
  model,
  description,
  entity,
  method,
  status,
}: TApiSuccessRequestItemResponseProps) => {
  return ApiResponse({
    description,
    schema: {
      properties: {
        data: {
          $ref: getSchemaPath(model),
        },
        path: {
          type: 'string',
          example: `/api/v1/${entity}/`,
        },
        method: {
          type: 'string',
          example: method,
        },
        status: {
          type: 'number',
          example: status,
        },
        duration: {
          type: 'string',
          example: '18ms',
        },
      },
    },
  });
};

export type TApiErrorRequestItemResponseProps = {
  description: string;
  status: HttpStatus;
  error: string;
};

export const ApiErrorRequestItemResponse = ({
  description,
  status,
  error,
}: TApiErrorRequestItemResponseProps) => {
  return ApiResponse({
    status,
    description,
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'number',
          description: 'The HTTP status code',
          example: status,
        },
        message: {
          type: 'string',
          description: 'The error message.',
          example: error,
        },
      },
    },
  });
};

export type TRequestUser = {
  id: string;
};

export const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return { id: request.user['sub'] };
  },
);
