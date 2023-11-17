import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  HttpStatus,
  Type,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';

type TApiDocs = ReturnType<
  typeof ApiSuccessRequestItemResponse | typeof ApiErrorRequestItemResponse
>;

export const createApiDocs = (...docs: TApiDocs[]) => {
  return applyDecorators.bind(null, ...docs);
};

export type TApiSuccessRequestItemResponseProps = {
  model: Type<any>;
  description: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  status: HttpStatus;
};

export const ApiSuccessRequestItemResponse = ({
  model,
  description,
  url,
  method,
  status,
}: TApiSuccessRequestItemResponseProps) => {
  const props = getResponseProps({
    description,
    model,
    url,
    method,
    status,
  });
  if (model) {
    return applyDecorators(
      ApiExtraModels(model),
      applyResponseDecorators(status, props),
    );
  }

  return applyDecorators(applyResponseDecorators(status, props));
};

const getResponseProps = ({
  description,
  model,
  url,
  method,
  status,
}: TApiSuccessRequestItemResponseProps) => {
  return {
    status,
    description,
    schema: {
      properties: {
        ...(model ? { data: { $ref: getSchemaPath(model) } } : {}),
        path: {
          type: 'string',
          example: '/' + url,
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
  };
};

const applyResponseDecorators = (
  status: HttpStatus,
  options: ApiResponseOptions,
) => {
  if (status === HttpStatus.OK) {
    return ApiOkResponse(options);
  } else if (status === HttpStatus.CREATED) {
    return ApiCreatedResponse(options);
  }
  return ApiResponse(options);
};

export type TApiSuccessRequestItemResponseNoContentProps = Omit<
  TApiSuccessRequestItemResponseProps,
  'model' | 'status'
>;

export const ApiSuccessRequestItemResponseNoContent = (
  props: TApiSuccessRequestItemResponseNoContentProps,
) => {
  return ApiSuccessRequestItemResponse({
    ...props,
    model: null,
    status: HttpStatus.NO_CONTENT,
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
