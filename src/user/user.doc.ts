import { HttpStatus } from '@nestjs/common';
import {
  TApiErrorRequestItemResponseProps,
  TApiSuccessRequestItemResponseProps,
} from 'src/shared/decorator.shared';
import { UserPresenter } from './user.presenter';

// FIND BY ID
export const FindByIdSuccessResponse: TApiSuccessRequestItemResponseProps = {
  model: UserPresenter,
  description: 'The user has been successfully found.',
  entity: 'users',
  method: 'GET',
  status: HttpStatus.OK,
};
export const FindByIdNotFoundResponse: TApiErrorRequestItemResponseProps = {
  status: HttpStatus.NOT_FOUND,
  description: 'The user was not found.',
  error: 'User not found',
};
