import { ApiProperty } from '@nestjs/swagger';
import { TPaginationOutput } from 'src/shared/interface.shared';
import { PaginationPresenter } from 'src/shared/presenter.shared';
import { UserPresenter } from 'src/user/user.presenter';
import { MessageEntity } from './message.entity';

export class MessagePresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  content: string;
  @ApiProperty({ required: false })
  sender?: UserPresenter;
  @ApiProperty()
  senderId: string;
  @ApiProperty()
  chatId: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(message: MessageEntity) {
    this.id = message.id;
    this.content = message.content;
    this.sender = message.sender;
    this.senderId = message.senderId;
    this.chatId = message.chatId;
    this.createdAt = message.createdAt;
    this.updatedAt = message.updatedAt;
  }
}

export class MessageListPresenter {
  @ApiProperty({ type: [MessagePresenter] })
  list: MessagePresenter[];
  @ApiProperty()
  meta: PaginationPresenter;

  constructor(input: TPaginationOutput<MessageEntity>) {
    this.list = input.list.map((message) => new MessagePresenter(message));
    this.meta = input.meta;
  }
}
