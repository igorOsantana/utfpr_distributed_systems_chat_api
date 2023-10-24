import { HttpStatus } from '@nestjs/common';
import {
  TApiErrorRequestItemResponseProps,
  TApiSuccessRequestItemResponseProps,
} from 'src/shared/decorator.shared';
import { FindByIdOrEmailSuccessResponse } from '../user/user.doc';
import {
  MePresenter,
  RegisterAuthPresenter,
  SignInAuthPresenter,
} from './auth.presenter';

// ME
export const MeSuccessResponse: TApiSuccessRequestItemResponseProps = {
  ...FindByIdOrEmailSuccessResponse,
  entity: 'auth/me',
  model: MePresenter,
};
export const MeUnauthorizedResponse: TApiErrorRequestItemResponseProps = {
  status: HttpStatus.UNAUTHORIZED,
  description: 'Request user unauthorized.',
  error: 'You are not authorized',
};
// SIGN IN
export const SignInSuccessResponseDoc: TApiSuccessRequestItemResponseProps = {
  model: SignInAuthPresenter,
  description: 'The user has been successfully authenticated.',
  entity: 'auth/sign-in',
  method: 'POST',
  status: HttpStatus.OK,
};
export const SignInInvalidCredentialsResponseDoc: TApiErrorRequestItemResponseProps =
  {
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user credentials are invalid.',
    error: 'Email or password is incorrect',
  };
// REGISTER
export const RegisterSuccessResponseDoc: TApiSuccessRequestItemResponseProps = {
  model: RegisterAuthPresenter,
  description: 'The user has been successfully registered.',
  entity: 'auth/register',
  method: 'POST',
  status: HttpStatus.CREATED,
};
export const RegisterEmailAlreadyExistsResponseDoc: TApiErrorRequestItemResponseProps =
  {
    status: HttpStatus.CONFLICT,
    description: 'The email is already in use.',
    error: 'The email address you provided is already registered',
  };
