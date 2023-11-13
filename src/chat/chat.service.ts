import { Injectable } from '@nestjs/common';
import { DatabaseServices } from 'src/shared/database/database.service';
import { PaginationInputHelper } from 'src/shared/helpers.shared';
import { TPaginationInput } from 'src/shared/interface.shared';
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

  async findByParticipants(ids: string[]) {
    try {
      const chat = await this.databaseService.chat.findFirst({
        where: { participants: { every: { id: { in: ids } } } },
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

  async findAll(userId: string, paginationInput: TPaginationInput) {
    try {
      const { take, skip } = PaginationInputHelper.parse(paginationInput);
      const queryWhere = {
        where: {
          participants: { some: { id: userId } },
        },
      };
      const [chats, total] = await this.databaseService.$transaction([
        this.databaseService.chat.findMany({
          ...queryWhere,
          include: {
            participants: true,
          },
          take,
          skip,
        }),
        this.databaseService.chat.count(queryWhere),
      ]);
      return new ChatEntity().list(chats, skip, total);
    } catch (error) {
      throw new ChatExceptions().findAll(error);
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
