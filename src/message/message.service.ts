import { Injectable } from '@nestjs/common';
import { DatabaseServices } from 'src/shared/database/database.service';
import { PaginationInputHelper } from 'src/shared/helpers.shared';
import { TPaginationInput } from 'src/shared/interface.shared';
import { MessageEntity } from './message.entity';
import { MessageExceptions } from './message.exception';
import { TCreateMessageInput } from './message.interface';

@Injectable()
export class MessageServices {
  constructor(private readonly databaseServices: DatabaseServices) {}

  async create(input: TCreateMessageInput) {
    try {
      const [message] = await this.databaseServices.$transaction([
        this.databaseServices.message.create({
          data: {
            content: input.content,
            chat: { connect: { id: input.chatId } },
            sender: { connect: { id: input.ownerId } },
          },
          include: { sender: true },
        }),
        this.databaseServices.chat.update({
          where: { id: input.chatId },
          data: { lastMsg: input.content },
        }),
      ]);
      return new MessageEntity(message);
    } catch (error) {
      throw new MessageExceptions().create(error);
    }
  }

  async findAll(chatId: string, paginationParams: TPaginationInput) {
    const { take, skip } = PaginationInputHelper.parse(paginationParams);
    const queryWhere = { where: { chatId } };
    try {
      const [messages, total] = await Promise.all([
        this.databaseServices.message.findMany({
          ...queryWhere,
          orderBy: { createdAt: 'desc' },
          take,
          skip,
        }),
        this.databaseServices.message.count(queryWhere),
      ]);
      return new MessageEntity().list(messages, skip, total);
    } catch (error) {
      throw new MessageExceptions().findAll(error);
    }
  }
}
