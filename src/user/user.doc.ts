import { HttpStatus } from '@nestjs/common';
import { ApiParamOptions } from '@nestjs/swagger';
import {
  TApiErrorRequestItemResponseProps,
  TApiSuccessRequestItemResponseProps,
} from 'src/shared/decorator.shared';
import { UserPresenter } from './user.presenter';

// FIND BY ID OR EMAIL
export const FindByIdOrEmailParam: ApiParamOptions = {
  name: 'idOrEmail',
  description: 'The ID or email of the user',
  format: 'uuid',
};
export const FindByIdOrEmailSuccessResponse: TApiSuccessRequestItemResponseProps =
  {
    model: UserPresenter,
    description: 'The user has been successfully found.',
    entity: 'users/:idOrEmail',
    method: 'GET',
    status: HttpStatus.OK,
  };
export const FindByIdOrEmailNotFoundResponse: TApiErrorRequestItemResponseProps =
  {
    status: HttpStatus.NOT_FOUND,
    description: 'The user was not found.',
    error: 'User not found',
  };
