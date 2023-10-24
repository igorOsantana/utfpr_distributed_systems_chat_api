import { ApiProperty } from '@nestjs/swagger';
import { UserPresenter } from 'src/user/user.presenter';
import { FriendshipEntity, FriendshipStatus } from './friendship.entity';

export class FriendshipPresenter {
  @ApiProperty()
  sender: UserPresenter;
  @ApiProperty()
  recipient: UserPresenter;
  @ApiProperty()
  status: FriendshipStatus;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(friendship: FriendshipEntity) {
    this.sender = friendship.sender;
    this.recipient = friendship.recipient;
    this.status = friendship.status;
    this.createdAt = friendship.createdAt;
    this.updatedAt = friendship.updatedAt;
  }
}

export class MyFriendsFriendshipPresenter {
  @ApiProperty({ isArray: true, type: UserPresenter })
  friends: UserPresenter[];

  constructor(userId: string, friendships: FriendshipEntity[]) {
    this.friends = friendships.map((friendship) =>
      friendship.sender.id === userId
        ? friendship.recipient
        : friendship.sender,
    );
  }
}

export class RequestsFriendshipPresenter {
  @ApiProperty({ isArray: true, type: UserPresenter })
  requests: UserPresenter[];

  constructor(friendships: FriendshipEntity[]) {
    this.requests = friendships.map((friendship) => friendship.sender);
  }
}
