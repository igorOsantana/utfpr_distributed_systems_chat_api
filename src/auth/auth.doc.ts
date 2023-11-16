import { HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiErrorRequestItemResponse,
  ApiSuccessRequestItemResponse,
  createApiDocs,
} from 'src/shared/decorator.shared';
import {
  InternalServerErrorResponseDoc,
  UnauthorizedResponseDoc,
} from 'src/shared/doc.shared';
import {
  MePresenter,
  RegisterAuthPresenter,
  SignInAuthPresenter,
} from './auth.presenter';

// CONTROLLERS
export const AuthControllersDoc = createApiDocs(
  ApiTags('Authentication'),
  InternalServerErrorResponseDoc(),
);
// ME
export const MeResponseDoc = createApiDocs(
  ApiSuccessRequestItemResponse({
    model: MePresenter,
    description: 'The user has been successfully found.',
    url: 'auth/me',
    method: 'GET',
    status: HttpStatus.OK,
  }),
  ApiErrorRequestItemResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Request user unauthorized.',
    error: 'You are not authorized',
  }),
  UnauthorizedResponseDoc(),
);
// SIGN IN
export const SignInResponseDoc = createApiDocs(
  ApiSuccessRequestItemResponse({
    model: SignInAuthPresenter,
    description: 'The user has been successfully authenticated.',
    url: 'auth/sign-in',
    method: 'POST',
    status: HttpStatus.OK,
  }),
  ApiErrorRequestItemResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The user credentials are invalid.',
    error: 'Email or password is incorrect',
  }),
);
// REGISTER
export const RegisterResponseDoc = createApiDocs(
  ApiSuccessRequestItemResponse({
    model: RegisterAuthPresenter,
    description: 'The user has been successfully registered.',
    url: 'auth/register',
    method: 'POST',
    status: HttpStatus.CREATED,
  }),
  ApiErrorRequestItemResponse({
    status: HttpStatus.CONFLICT,
    description: 'The email is already in use.',
    error: 'The email address you provided is already registered',
  }),
);
