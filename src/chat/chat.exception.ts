import { ApiException } from 'src/shared/exception.shared';

export class ChatExceptions extends ApiException {
  static readonly ID = '@CHAT_EXCEPTIONS';

  static isOwnException(err: unknown): boolean {
    return ApiException.isOwnException(err, ChatExceptions.ID);
  }

  create(err?: unknown) {
    return new ApiException().internal('[ChatService - Create]', err);
  }

  read(err?: unknown) {
    return new ApiException().internal('[ChatService - Read]', err);
  }

  find(err?: unknown) {
    return new ApiException().internal('[ChatService - Find]', err);
  }

  findAll(err?: unknown) {
    return new ApiException().internal('[ChatService - FindAll]', err);
  }

  notFound(err?: unknown) {
    return new ApiException().notFound(
      ChatExceptions.ID,
      'Chat not found',
      err,
    );
  }

  recipientNotFound(err?: unknown) {
    return new ApiException().notFound(
      ChatExceptions.ID,
      'Recipient not found',
      err,
    );
  }

  alreadyExists(err?: unknown) {
    return new ApiException().conflict(
      ChatExceptions.ID,
      'Chat already exists',
      err,
    );
  }
}
