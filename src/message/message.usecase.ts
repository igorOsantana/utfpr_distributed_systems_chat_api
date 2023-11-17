import { Injectable } from '@nestjs/common';
import { ChatServices } from 'src/chat/chat.service';
import { TPaginationInput } from 'src/shared/interface.shared';
import { MessageExceptions } from './message.exception';
import { TCreateMessageInput } from './message.interface';
import { MessageServices } from './message.service';

@Injectable()
export class MessageUseCases {
  constructor(
    private readonly chatServices: ChatServices,
    private readonly messageServices: MessageServices,
  ) {}

  async findAll(chatId: string, paginationParams: TPaginationInput) {
    return await this.messageServices.findAll(chatId, paginationParams);
  }

  async send(input: TCreateMessageInput) {
    const chatExists = await this.chatExists(input.chatId);

    if (!chatExists) {
      throw new MessageExceptions().chatNotFound();
    }

    return await this.messageServices.create(input);
  }

  private async chatExists(chatId: string) {
    try {
      const chat = await this.chatServices.findById(chatId);
      return Boolean(chat);
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
