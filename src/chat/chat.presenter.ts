import { ApiProperty } from '@nestjs/swagger';
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
  participants: UserPresenter[];
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(chat: ChatEntity) {
    const participants = chat.participants.map(
      (participant) => new UserPresenter(participant),
    );

    this.id = chat.id;
    this.read = chat.read;
    this.lastMessage = chat.lastMessage;
    this.participants = participants;
    this.createdAt = chat.createdAt;
    this.updatedAt = chat.updatedAt;
  }
}
