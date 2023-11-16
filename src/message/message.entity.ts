import { Message, User } from '@prisma/client';
import { TPaginationOutput } from 'src/shared/interface.shared';
import { UserEntity } from 'src/user/user.entity';

export class MessageEntity {
  id: string;
  content: string;
  sender?: UserEntity;
  senderId: string;
  chatId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(input?: PrismaMessage) {
    if (!input) return;

    this.id = input.id;
    this.content = input.content;
    this.chatId = input.chatId;
    this.sender = input.sender;
    this.senderId = input.senderId;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
  }

  list(
    messages: PrismaMessage[],
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

type PrismaMessage = Message & { sender?: User };
