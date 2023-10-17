import { ApiException } from 'src/shared/exception.shared';

export class UserExceptions extends ApiException {
  static readonly ID = '@USER_EXCEPTIONS';

  static isOwnException(err: unknown): boolean {
    return ApiException.isOwnException(err, UserExceptions.ID);
  }

  create(err?: unknown) {
    return new ApiException().internal('[UserService - Create]', err);
  }

  find(err?: unknown) {
    return new ApiException().internal('[UserService - Find]', err);
  }

  notFound(err?: unknown) {
    return new ApiException().notFound(
      UserExceptions.ID,
      'User not found',
      err,
    );
  }

  emailInUse(err?: unknown) {
    return new ApiException().conflict(
      UserExceptions.ID,
      'The email address you provided is already registered',
      err,
    );
  }
}
