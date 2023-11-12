import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RequestUser, TRequestUser } from 'src/shared/decorator.shared';
import { ChatControllersDoc } from './chat.decorator';
import { CreateResponseDoc, MarkAsReadResponseDoc } from './chat.doc';
import { CreateChatDto } from './chat.dto';
import { ChatPresenter } from './chat.presenter';
import { ChatUseCases } from './chat.usecase';

@Controller('chats')
@ChatControllersDoc()
export class ChatControllers {
  constructor(private readonly chatUseCases: ChatUseCases) {}

  @Post()
  @CreateResponseDoc()
  async create(
    @Body() dto: CreateChatDto,
    @RequestUser() reqUser: TRequestUser,
  ) {
    const params = {
      msgContent: dto.msgContent,
      recipientId: dto.recipientId,
      senderId: reqUser.id,
    };
    const chat = await this.chatUseCases.create(params);
    return new ChatPresenter(chat);
  }

  @Patch('/mark-as-read/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @MarkAsReadResponseDoc()
  async markAsRead(
    @Param('id') id: string,
    @RequestUser() reqUser: TRequestUser,
  ) {
    await this.chatUseCases.markAsRead(id, reqUser.id);
  }
}
