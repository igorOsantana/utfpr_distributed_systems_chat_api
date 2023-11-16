import { Chat, User, UsersOnChats } from '@prisma/client';
import { TPaginationOutput } from 'src/shared/interface.shared';
import { UserEntity } from 'src/user/user.entity';

export class ChatEntity {
  id: string;
  read: boolean;
  lastMessage: string;
  recipient: UserEntity;
  sender: UserEntity;
  createdAt: Date;
  updatedAt: Date;

  private participantsInfo: {
    userId: string;
    user: UserEntity;
    read: boolean;
  }[] = null;

  constructor(
    input?: Chat & { participants?: (UsersOnChats & { user: User })[] },
  ) {
    if (!input) return;

    this.id = input.id;
    this.lastMessage = input.lastMsg;
    this.participantsInfo = input.participants.map(
      ({ userId, user, read }) => ({
        userId,
        user,
        read,
      }),
    );
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
  }

  list(
    chats: Chat[],
    skipped: number,
    total: number,
  ): TPaginationOutput<ChatEntity> {
    return {
      list: chats.map((chat) => new ChatEntity(chat)),
      meta: {
        taken: chats.length,
        skipped,
        total,
      },
    };
  }

  setDataByReqUserId(reqUserId: string) {
    for (const info of this.participantsInfo) {
      if (info.userId !== reqUserId) {
        this.recipient = info.user;
      } else if (info.userId === reqUserId) {
        this.sender = info.user;
        this.read = info.read;
      }
    }
  }

  isParticipant(participantId: string) {
    return this.participantsInfo.some(({ userId }) => userId === participantId);
  }
}
