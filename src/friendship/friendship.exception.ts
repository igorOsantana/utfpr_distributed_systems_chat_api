import { ApiException } from 'src/shared/exception.shared';

export class FriendshipExceptions extends ApiException {
  static readonly ID = '@FRIENDSHIP_EXCEPTIONS';

  static isOwnException(err: unknown): boolean {
    return ApiException.isOwnException(err, FriendshipExceptions.ID);
  }

  create(err?: unknown) {
    return new ApiException().internal('[FriendshipService - Create]', err);
  }

  accept(err?: unknown) {
    return new ApiException().internal('[FriendshipService - Accept]', err);
  }

  decline(err?: unknown) {
    return new ApiException().internal('[FriendshipService - Decline]', err);
  }

  find(err?: unknown) {
    return new ApiException().internal('[FriendshipService - Find]', err);
  }

  alreadyExists(err?: unknown) {
    return new ApiException().badRequest(
      FriendshipExceptions.ID,
      'A request for friendship already exists',
      err,
    );
  }
}
