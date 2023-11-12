import { Message } from '@prisma/client';
import { TPaginationOutput } from 'src/shared/interface.shared';

export class MessageEntity {
  id: string;
  content: string;
  senderId: string;
  chatId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(input?: Message) {
    if (!input) return;

    this.id = input.id;
    this.content = input.content;
    this.chatId = input.chatId;
    this.senderId = input.senderId;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
  }

  list(
    messages: Message[],
    skipped: number,
    total: number,
  ): TPaginationOutput<MessageEntity> {
    return {
      list: messages.map((message) => new MessageEntity(message)),
      meta: {
        taken: messages.length,
        skipped,
        total,
      },
    };
  }
}
