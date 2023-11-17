import { Injectable } from '@nestjs/common';
import { TPaginationInput } from 'src/shared/interface.shared';
import { UserServices } from 'src/user/user.service';
import { ChatExceptions } from './chat.exception';
import { TCreateChatInput } from './chat.interface';
import { ChatServices } from './chat.service';

@Injectable()
export class ChatUseCases {
  constructor(
    private readonly userServices: UserServices,
    private readonly chatServices: ChatServices,
  ) {}

  async create(input: TCreateChatInput) {
    const chatAlreadyExists = await this.chatAlreadyExists([
      input.senderId,
      input.recipientId,
    ]);

    if (chatAlreadyExists) {
      throw new ChatExceptions().alreadyExists();
    }

    const recipientExists = await this.recipientExists(input.recipientId);

    if (!recipientExists) {
      throw new ChatExceptions().recipientNotFound();
    }

    return await this.chatServices.create(input);
  }

  private async chatAlreadyExists(participants: string[]) {
    try {
      const chat = await this.chatServices.findByParticipants(participants);
      return Boolean(chat);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  private async recipientExists(recipientId: string) {
    try {
      const recipient = await this.userServices.findById(recipientId);
      return Boolean(recipient);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async findAll(userId: string, paginationInput: TPaginationInput) {
    return await this.chatServices.findAll(userId, paginationInput);
  }

  async findById(id: string) {
    return await this.chatServices.findById(id);
  }

  async markAsRead(id: string, reqUserId: string) {
    const valid = await this.validateByParticipantId(id, reqUserId);

    if (!valid) {
      throw new ChatExceptions().notFound();
    }

    await this.chatServices.markAsRead(id, reqUserId);
  }

  private async validateByParticipantId(id: string, participantId: string) {
    try {
      const chat = await this.chatServices.findById(id);
      return chat.isParticipant(participantId);
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
