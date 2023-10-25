import { HttpStatus } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import {
  ApiErrorRequestItemResponse,
  ApiSuccessRequestItemResponse,
  createApiDocs,
} from 'src/shared/decorator.shared';
import { UserPresenter } from './user.presenter';

// FIND BY ID OR EMAIL
export const FindByIdOrEmailResponseDoc = createApiDocs(
  ApiParam({
    name: 'idOrEmail',
    description: 'The ID or email of the user',
  }),
  ApiSuccessRequestItemResponse({
    model: UserPresenter,
    description: 'The user has been successfully found.',
    url: 'users/:idOrEmail',
    method: 'GET',
    status: HttpStatus.OK,
  }),
  ApiErrorRequestItemResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The user was not found.',
    error: 'User not found',
  }),
);
