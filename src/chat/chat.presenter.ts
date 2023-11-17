import { ApiProperty } from '@nestjs/swagger';
import { TPaginationOutput } from 'src/shared/interface.shared';
import { PaginationPresenter } from 'src/shared/presenter.shared';
import { UserPresenter } from 'src/user/user.presenter';
import { ChatEntity } from './chat.entity';

export class ChatPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  read: boolean;
  @ApiProperty()
  lastMessage: string;
  @ApiProperty()
  recipient: UserPresenter;
  @ApiProperty()
  sender: UserPresenter;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(chat: ChatEntity, reqUserId: string) {
    chat.setDataByReqUserId(reqUserId);

    this.id = chat.id;
    this.read = chat.read;
    this.lastMessage = chat.lastMessage;
    this.recipient = new UserPresenter(chat.recipient);
    this.sender = new UserPresenter(chat.sender);
    this.createdAt = chat.createdAt;
    this.updatedAt = chat.updatedAt;
  }
}

export class ChatListPresenter {
  @ApiProperty({ type: [ChatPresenter] })
  list: ChatPresenter[];
  @ApiProperty()
  meta: PaginationPresenter;

  constructor(input: TPaginationOutput<ChatEntity>, reqUserId: string) {
    this.list = input.list.map((chat) => new ChatPresenter(chat, reqUserId));
    this.meta = input.meta;
  }
}
