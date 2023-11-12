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
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(chat: ChatEntity, reqUserId: string) {
    const recipient = chat.participants?.find(
      (participant) => participant.id !== reqUserId,
    );

    if (recipient) {
      this.recipient = new UserPresenter(recipient);
    }

    this.id = chat.id;
    this.read = chat.read;
    this.lastMessage = chat.lastMessage;
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
