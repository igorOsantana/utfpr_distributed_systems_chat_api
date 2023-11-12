import { Injectable } from '@nestjs/common';
import { DatabaseServices } from 'src/shared/database/database.service';
import { ChatEntity } from './chat.entity';
import { ChatExceptions } from './chat.exception';
import { TCreateChatInput } from './chat.interface';

@Injectable()
export class ChatServices {
  constructor(private readonly databaseService: DatabaseServices) {}

  async create(params: TCreateChatInput) {
    try {
      const chat = await this.databaseService.chat.create({
        data: {
          lastMsg: params.msgContent,
          participants: {
            connect: [{ id: params.senderId }, { id: params.recipientId }],
          },
          messages: {
            create: {
              content: params.msgContent,
              senderId: params.senderId,
            },
          },
        },
        include: {
          participants: true,
        },
      });
      return new ChatEntity(chat);
    } catch (error) {
      throw new ChatExceptions().create(error);
    }
  }

  async findById(id: string) {
    try {
      const chat = await this.databaseService.chat.findUnique({
        where: { id },
        include: { participants: true },
      });

      if (!chat) {
        throw new ChatExceptions().notFound();
      }

      return new ChatEntity(chat);
    } catch (error) {
      throw new ChatExceptions().find(error);
    }
  }

  async markAsRead(id: string) {
    try {
      await this.databaseService.chat.update({
        where: { id },
        data: { read: true },
      });
    } catch (error) {
      throw new ChatExceptions().read(error);
    }
  }
}
