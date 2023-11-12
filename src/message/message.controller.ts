import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RequestUser, TRequestUser } from 'src/shared/decorator.shared';
import { PaginationDto } from 'src/shared/dto.shared';
import {
  FindAllResponseDoc,
  MessageControllersDoc,
  SendResponseDoc,
} from './message.doc';
import { SendMessageDto } from './message.dto';
import { MessageListPresenter, MessagePresenter } from './message.presenter';
import { MessageUseCases } from './message.usecase';

@Controller('messages')
@MessageControllersDoc()
export class MessageControllers {
  constructor(private readonly messageUseCases: MessageUseCases) {}

  @Get('/:chatId')
  @FindAllResponseDoc()
  async findAll(
    @Param('chatId') id: string,
    @Query() paginationInput: PaginationDto,
  ) {
    const messages = await this.messageUseCases.findAll(id, paginationInput);
    return new MessageListPresenter(messages);
  }

  @Post('/:chatId')
  @SendResponseDoc()
  async send(
    @Param('chatId') chatId: string,
    @Body() dto: SendMessageDto,
    @RequestUser() reqUser: TRequestUser,
  ) {
    const params = {
      content: dto.content,
      ownerId: reqUser.id,
      chatId,
    };
    const message = await this.messageUseCases.send(params);
    return new MessagePresenter(message);
  }
}
