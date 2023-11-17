import { $Enums, Friendship, User } from '@prisma/client';
import { UserEntity } from 'src/user/user.entity';

export class FriendshipEntity {
  sender: UserEntity;
  recipient: UserEntity;
  status: FriendshipStatus;
  createdAt: Date;
  updatedAt: Date;

  static adaptMany(input: TFriendshipInvitations[]): FriendshipEntity[] {
    return input.map((friendship) => this.adapt(friendship));
  }

  static adapt(input: TFriendshipInvitations): FriendshipEntity {
    const friendship = new FriendshipEntity();
    friendship.sender = input.sender;
    friendship.recipient = input.recipient;
    friendship.status = this.adaptStatus(input.status);
    friendship.createdAt = input.createdAt;
    friendship.updatedAt = input.updatedAt;
    return friendship;
  }

  private static adaptStatus(
    status: $Enums.FriendshipStatus,
  ): FriendshipStatus {
    switch (status) {
      case $Enums.FriendshipStatus.PENDING:
        return FriendshipStatus.PENDING;
      case $Enums.FriendshipStatus.ACCEPTED:
        return FriendshipStatus.ACCEPTED;
      case $Enums.FriendshipStatus.DECLINED:
        return FriendshipStatus.DECLINED;
    }
  }
}

export enum FriendshipStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

type TFriendshipInvitations = Friendship & {
  sender: User;
  recipient: User;
};
