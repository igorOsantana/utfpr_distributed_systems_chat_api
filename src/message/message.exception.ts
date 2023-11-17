import { ApiException } from 'src/shared/exception.shared';

export class MessageExceptions extends ApiException {
  static readonly ID = '@MESSAGE_EXCEPTIONS';

  static isOwnException(err: unknown): boolean {
    return ApiException.isOwnException(err, MessageExceptions.ID);
  }

  create(err?: unknown) {
    return new ApiException().internal('[MessageService - Create]', err);
  }

  findAll(err?: unknown) {
    return new ApiException().internal('[MessageService - FindAll]', err);
  }

  chatNotFound(err?: unknown) {
    return new ApiException().notFound(
      MessageExceptions.ID,
      'Chat not found',
      err,
    );
  }
}
