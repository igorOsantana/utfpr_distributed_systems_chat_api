import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestUser, TRequestUser } from 'src/shared/decorator.shared';
import {
  FriendshipPresenter,
  MyFriendsFriendshipPresenter,
  RequestsFriendshipPresenter,
} from './friendship.presenter';
import { FriendshipService } from './friendship.service';

@ApiTags('Friendships')
@Controller('friendships')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Post('/:recipientId')
  async create(
    @RequestUser() reqUser: TRequestUser,
    @Param('recipientId') recipientId: string,
  ) {
    const pendingFriendship = await this.friendshipService.create(
      reqUser.id,
      recipientId,
    );
    return new FriendshipPresenter(pendingFriendship);
  }

  @Patch('/accept/:senderId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async accept(
    @Param('senderId') senderId: string,
    @RequestUser() reqUser: TRequestUser,
  ) {
    await this.friendshipService.accept(senderId, reqUser.id);
  }

  @Patch('/decline/:senderId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async decline(
    @Param('senderId') senderId: string,
    @RequestUser() reqUser: TRequestUser,
  ) {
    await this.friendshipService.decline(senderId, reqUser.id);
  }

  @Get('/my-friends')
  async myFriends(@RequestUser() reqUser: TRequestUser) {
    const friendships = await this.friendshipService.myFriends(reqUser.id);
    return new MyFriendsFriendshipPresenter(reqUser.id, friendships);
  }

  @Get('/requests')
  async myPendingFriendships(@RequestUser() reqUser: TRequestUser) {
    const friendships = await this.friendshipService.requests(reqUser.id);
    return new RequestsFriendshipPresenter(friendships);
  }
}
