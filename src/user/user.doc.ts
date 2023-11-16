import { HttpStatus } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import {
  ApiErrorRequestItemResponse,
  ApiSuccessRequestItemResponse,
  createApiDocs,
} from 'src/shared/decorator.shared';
import {
  InternalServerErrorResponseDoc,
  UnauthorizedResponseDoc,
} from 'src/shared/doc.shared';
import { UserPresenter } from './user.presenter';

// CONTROLLERS
export const UserControllersDoc = createApiDocs(
  ApiTags('Users'),
  UnauthorizedResponseDoc(),
  InternalServerErrorResponseDoc(),
);
// FIND BY ID OR EMAIL
export const FindByIdOrEmailResponseDoc = createApiDocs(
  ApiParam({
    name: 'id-or-email',
    description: 'The ID or email of the user',
  }),
  ApiSuccessRequestItemResponse({
    model: UserPresenter,
    description: 'The user has been successfully found.',
    url: 'users/:id-or-email',
    method: 'GET',
    status: HttpStatus.OK,
  }),
  ApiErrorRequestItemResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The user was not found.',
    error: 'User not found',
  }),
);
