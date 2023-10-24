import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import {
  ApiErrorRequestItemResponse,
  ApiSuccessRequestItemResponse,
  ApiSuccessRequestItemResponseNoContent,
  RequestUser,
  TRequestUser,
} from 'src/shared/decorator.shared';
import {
  AcceptFriendshipNotFoundResponse,
  AcceptParamsSenderId,
  AcceptSuccessResponse,
  CreateFriendshipExistsResponse,
  CreateParamsRecipientId,
  CreateSuccessResponse,
  DeclineFriendshipNotFoundResponse,
  DeclineParamsSenderId,
  DeclineSuccessResponse,
  MyFriendsSuccessResponse,
  RequestsSuccessResponse,
} from './friendship.doc';
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
  @ApiParam(CreateParamsRecipientId)
  @ApiSuccessRequestItemResponse(CreateSuccessResponse)
  @ApiErrorRequestItemResponse(CreateFriendshipExistsResponse)
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
  @ApiParam(AcceptParamsSenderId)
  @ApiSuccessRequestItemResponseNoContent(AcceptSuccessResponse)
  @ApiErrorRequestItemResponse(AcceptFriendshipNotFoundResponse)
  async accept(
    @Param('senderId') senderId: string,
    @RequestUser() reqUser: TRequestUser,
  ) {
    await this.friendshipService.accept(senderId, reqUser.id);
  }

  @Patch('/decline/:senderId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam(DeclineParamsSenderId)
  @ApiSuccessRequestItemResponseNoContent(DeclineSuccessResponse)
  @ApiErrorRequestItemResponse(DeclineFriendshipNotFoundResponse)
  async decline(
    @Param('senderId') senderId: string,
    @RequestUser() reqUser: TRequestUser,
  ) {
    await this.friendshipService.decline(senderId, reqUser.id);
  }

  @Get('/my-friends')
  @ApiSuccessRequestItemResponse(MyFriendsSuccessResponse)
  async myFriends(@RequestUser() reqUser: TRequestUser) {
    const friendships = await this.friendshipService.myFriends(reqUser.id);
    return new MyFriendsFriendshipPresenter(reqUser.id, friendships);
  }

  @Get('/requests')
  @ApiSuccessRequestItemResponse(RequestsSuccessResponse)
  async myPendingFriendships(@RequestUser() reqUser: TRequestUser) {
    const friendships = await this.friendshipService.requests(reqUser.id);
    return new RequestsFriendshipPresenter(friendships);
  }
}
