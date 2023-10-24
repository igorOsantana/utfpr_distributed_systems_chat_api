import { HttpStatus } from '@nestjs/common';
import { ApiParamOptions } from '@nestjs/swagger';
import {
  TApiErrorRequestItemResponseProps,
  TApiSuccessRequestItemResponseNoContentProps,
  TApiSuccessRequestItemResponseProps,
} from 'src/shared/decorator.shared';
import {
  FriendshipPresenter,
  MyFriendsFriendshipPresenter,
  RequestsFriendshipPresenter,
} from './friendship.presenter';

// CREATE
export const CreateParamsRecipientId: ApiParamOptions = {
  name: 'recipientId',
  description: 'The ID of the user who will receive the friendship request',
  format: 'uuid',
};
export const CreateSuccessResponse: TApiSuccessRequestItemResponseProps = {
  model: FriendshipPresenter,
  description:
    'A request for a new friendship has been successfully created. The status of the friendship is PENDING.',
  entity: 'friendships/:recipientId',
  method: 'GET',
  status: HttpStatus.CREATED,
};
export const CreateFriendshipExistsResponse: TApiErrorRequestItemResponseProps =
  {
    status: HttpStatus.BAD_REQUEST,
    description: 'Already exists a request for friendship between the users',
    error: 'A request for friendship already exists',
  };
// ACCEPT
export const AcceptParamsSenderId: ApiParamOptions = {
  name: 'senderId',
  description: 'The ID of the user who sent the friendship request',
  format: 'uuid',
};
export const AcceptSuccessResponse: TApiSuccessRequestItemResponseNoContentProps =
  {
    description: 'The friendship request has been successfully accepted',
    entity: 'friendships/accept/:senderId',
    method: 'PATCH',
  };
export const AcceptFriendshipNotFoundResponse: TApiErrorRequestItemResponseProps =
  {
    status: HttpStatus.BAD_REQUEST,
    description: 'The friendship request does not exists',
    error: 'The friendship request does not exists',
  };
// DECLINE
export const DeclineParamsSenderId: ApiParamOptions = AcceptParamsSenderId;
export const DeclineSuccessResponse: TApiSuccessRequestItemResponseNoContentProps =
  {
    description: 'The friendship request has been successfully declined',
    entity: 'friendships/decline/:senderId',
    method: 'PATCH',
  };
export const DeclineFriendshipNotFoundResponse: TApiErrorRequestItemResponseProps =
  AcceptFriendshipNotFoundResponse;
// MY FRIENDS
export const MyFriendsSuccessResponse: TApiSuccessRequestItemResponseProps = {
  model: MyFriendsFriendshipPresenter,
  description: 'The list of friends has been successfully retrieved',
  entity: 'friendships/my-friends',
  method: 'GET',
  status: HttpStatus.OK,
};
// REQUESTS
export const RequestsSuccessResponse: TApiSuccessRequestItemResponseProps = {
  ...MyFriendsSuccessResponse,
  description: 'The list of requests has been successfully retrieved',
  entity: 'friendships/requests',
  model: RequestsFriendshipPresenter,
};
