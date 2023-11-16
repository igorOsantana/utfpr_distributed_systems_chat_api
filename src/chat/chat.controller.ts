import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RequestUser, TRequestUser } from 'src/shared/decorator.shared';
import {
  ChatControllersDoc,
  CreateResponseDoc,
  FindAllResponseDoc,
  MarkAsReadResponseDoc,
} from './chat.doc';
import { CreateChatDto, FindAllChatDto } from './chat.dto';
import { ChatListPresenter, ChatPresenter } from './chat.presenter';
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
    return new ChatPresenter(chat, reqUser.id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @FindAllResponseDoc()
  async findAll(
    @RequestUser() reqUser: TRequestUser,
    @Query() dto: FindAllChatDto,
  ) {
    const chats = await this.chatUseCases.findAll(reqUser.id, dto);
    return new ChatListPresenter(chats, reqUser.id);
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
