import { ApiException } from 'src/shared/exception.shared';

export class AuthExceptions {
  static readonly ID = '@AUTH_EXCEPTIONS';

  static isOwnException(err: unknown): boolean {
    return ApiException.isOwnException(err, AuthExceptions.ID);
  }

  hash(err?: unknown): ApiException {
    return new ApiException().internal('[AuthService - Hash]', err);
  }

  compare(err?: unknown): ApiException {
    return new ApiException().internal('[AuthService - Compare]', err);
  }

  generateToken(err?: unknown): ApiException {
    return new ApiException().internal('[AuthService - GenerateToken]', err);
  }

  signIn(err?: unknown): ApiException {
    return new ApiException().internal('[AuthService - SignIn]', err);
  }

  invalidCredentials(err?: unknown): ApiException {
    return new ApiException().unauthorized(
      AuthExceptions.ID,
      'Email or password is incorrect',
      err,
    );
  }

  unauthorized(err?: unknown): ApiException {
    return new ApiException().unauthorized(
      AuthExceptions.ID,
      'You are not authorized',
      err,
    );
  }

  register(err?: unknown): ApiException {
    return new ApiException().internal('[AuthService - Register]', err);
  }
}
