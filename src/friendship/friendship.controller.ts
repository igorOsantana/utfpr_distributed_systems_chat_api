import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RequestUser, TRequestUser } from 'src/shared/decorator.shared';
import { FriendshipControllersDoc } from './friendship.decorator';
import {
  AcceptResponseDoc,
  CreateResponseDoc,
  DeclineResponseDoc,
  MyFriendsResponseDoc,
  RequestsResponseDoc,
} from './friendship.doc';
import {
  FriendshipPresenter,
  MyFriendsFriendshipPresenter,
  RequestsFriendshipPresenter,
} from './friendship.presenter';
import { FriendshipServices } from './friendship.service';

@Controller('friendships')
@FriendshipControllersDoc()
export class FriendshipControllers {
  constructor(private readonly friendshipService: FriendshipServices) {}

  @Post('/:recipient-id')
  @CreateResponseDoc()
  async create(
    @RequestUser() reqUser: TRequestUser,
    @Param('recipient-id')
    recipientId: string,
  ) {
    const pendingFriendship = await this.friendshipService.create(
      reqUser.id,
      recipientId,
    );
    return new FriendshipPresenter(pendingFriendship);
  }

  @Patch('/accept/:sender-id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @AcceptResponseDoc()
  async accept(
    @Param('sender-id') senderId: string,
    @RequestUser() reqUser: TRequestUser,
  ) {
    await this.friendshipService.accept(senderId, reqUser.id);
  }

  @Patch('/decline/:sender-id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @DeclineResponseDoc()
  async decline(
    @Param('sender-id') senderId: string,
    @RequestUser() reqUser: TRequestUser,
  ) {
    await this.friendshipService.decline(senderId, reqUser.id);
  }

  @Get('/my-friends')
  @MyFriendsResponseDoc()
  async myFriends(@RequestUser() reqUser: TRequestUser) {
    const friendships = await this.friendshipService.myFriends(reqUser.id);
    return new MyFriendsFriendshipPresenter(reqUser.id, friendships);
  }

  @Get('/requests')
  @RequestsResponseDoc()
  async myPendingFriendships(@RequestUser() reqUser: TRequestUser) {
    const friendships = await this.friendshipService.requests(reqUser.id);
    return new RequestsFriendshipPresenter(friendships);
  }
}
