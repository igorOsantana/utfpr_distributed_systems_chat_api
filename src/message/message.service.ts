import { Injectable } from '@nestjs/common';
import { DatabaseServices } from 'src/shared/database/database.service';
import { PaginationInputHelper } from 'src/shared/helpers.shared';
import { TPaginationInput } from 'src/shared/interface.shared';
import { MessageEntity } from './message.entity';
import { MessageExceptions } from './message.exception';
import { TCreateMessage } from './message.interface';

@Injectable()
export class MessageService {
  constructor(private readonly databaseService: DatabaseServices) {}

  async create(input: TCreateMessage) {
    try {
      const [message] = await this.databaseService.$transaction([
        this.databaseService.message.create({
          data: {
            content: input.content,
            chat: { connect: { id: input.chatId } },
            sender: { connect: { id: input.ownerId } },
          },
        }),
        this.databaseService.chat.update({
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
    try {
      const [messages, total] = await Promise.all([
        this.databaseService.message.findMany({
          where: { chatId },
          take,
          skip,
        }),
        this.databaseService.message.count({
          where: { chatId },
        }),
      ]);
      return new MessageEntity().list(messages, skip, total);
    } catch (error) {
      throw new MessageExceptions().findAll(error);
    }
  }
}
