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
import {
  AcceptResponseDoc,
  CreateResponseDoc,
  DeclineResponseDoc,
  FriendshipControllersDoc,
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

  @Post('/:recipientId')
  @CreateResponseDoc()
  async create(
    @RequestUser() reqUser: TRequestUser,
    @Param('recipientId')
    recipientId: string,
  ) {
    const pendingFriendship = await this.friendshipService.create(
      reqUser.id,
      recipientId,
    );
    return new FriendshipPresenter(pendingFriendship);
  }

  @Patch('/accept/:senderId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @AcceptResponseDoc()
  async accept(
    @Param('senderId') senderId: string,
    @RequestUser() reqUser: TRequestUser,
  ) {
    await this.friendshipService.accept(senderId, reqUser.id);
  }

  @Patch('/decline/:senderId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @DeclineResponseDoc()
  async decline(
    @Param('senderId') senderId: string,
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
