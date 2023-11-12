import { Chat, User } from '@prisma/client';
import { MessageEntity } from 'src/message/message.entity';
import { UserEntity } from 'src/user/user.entity';

export class ChatEntity {
  id: string;
  read: boolean;
  lastMessage: string;
  messages: MessageEntity[];
  participants: UserEntity[];
  createdAt: Date;
  updatedAt: Date;

  constructor(input?: Chat & Partial<{ participants?: User[] }>) {
    if (!input) return;

    this.id = input.id;
    this.read = input.read;
    this.lastMessage = input.lastMsg;
    this.participants = input.participants;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
  }
}
