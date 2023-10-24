import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/shared/database/database.service';
import { FriendshipEntity } from './friendship.entity';
import { FriendshipExceptions } from './friendship.exception';

@Injectable()
export class FriendshipService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(
    senderId: string,
    recipientId: string,
  ): Promise<FriendshipEntity> {
    const exists = await this.databaseService.friendships.findUnique({
      where: { senderId_recipientId: { senderId, recipientId } },
    });

    if (exists) {
      throw new FriendshipExceptions().alreadyExists();
    }

    try {
      const friendship = await this.databaseService.friendships.create({
        data: { senderId, recipientId },
        include: {
          sender: true,
          recipient: true,
        },
      });
      return FriendshipEntity.adapt(friendship);
    } catch (error) {
      throw new FriendshipExceptions().create(error);
    }
  }

  async accept(senderId: string, recipientId: string): Promise<void> {
    await this.validateIfExists(senderId, recipientId);
    try {
      await this.databaseService.friendships.update({
        where: { senderId_recipientId: { senderId, recipientId } },
        data: { status: 'ACCEPTED' },
      });
    } catch (error) {
      throw new FriendshipExceptions().accept(error);
    }
  }

  async decline(senderId: string, recipientId: string): Promise<void> {
    await this.validateIfExists(senderId, recipientId);
    try {
      await this.databaseService.friendships.update({
        where: { senderId_recipientId: { senderId, recipientId } },
        data: { status: 'DECLINED' },
      });
    } catch (error) {
      throw new FriendshipExceptions().decline(error);
    }
  }

  async myFriends(userId: string): Promise<FriendshipEntity[]> {
    try {
      const friendships = await this.databaseService.friendships.findMany({
        where: {
          OR: [{ senderId: userId }, { recipientId: userId }],
          status: 'ACCEPTED',
        },
        include: {
          sender: true,
          recipient: true,
        },
      });
      return FriendshipEntity.adaptMany(friendships);
    } catch (error) {
      throw new FriendshipExceptions().find(error);
    }
  }

  async requests(recipientId: string): Promise<FriendshipEntity[]> {
    try {
      const friendships = await this.databaseService.friendships.findMany({
        where: {
          recipientId,
          status: 'PENDING',
        },
        include: {
          sender: true,
          recipient: true,
        },
      });
      return FriendshipEntity.adaptMany(friendships);
    } catch (error) {
      throw new FriendshipExceptions().find(error);
    }
  }

  private async validateIfExists(
    senderId: string,
    recipientId: string,
  ): Promise<void> {
    const exists = await this.databaseService.friendships.findUnique({
      where: { senderId_recipientId: { senderId, recipientId } },
    });

    if (!exists) {
      throw new FriendshipExceptions().notFound(
        FriendshipExceptions.ID,
        'A request for friendship does not exists',
      );
    }
  }
}
