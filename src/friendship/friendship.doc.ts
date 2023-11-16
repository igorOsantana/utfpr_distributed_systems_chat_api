import { HttpStatus } from '@nestjs/common';
import { ApiParam, ApiParamOptions, ApiTags } from '@nestjs/swagger';
import {
  ApiErrorRequestItemResponse,
  ApiSuccessRequestItemResponse,
  ApiSuccessRequestItemResponseNoContent,
  TApiErrorRequestItemResponseProps,
  createApiDocs,
} from 'src/shared/decorator.shared';
import {
  InternalServerErrorResponseDoc,
  UnauthorizedResponseDoc,
} from 'src/shared/doc.shared';
import {
  FriendshipPresenter,
  MyFriendsFriendshipPresenter,
  RequestsFriendshipPresenter,
} from './friendship.presenter';

// CONTROLLERS
export const FriendshipControllersDoc = createApiDocs(
  ApiTags('Friendships'),
  UnauthorizedResponseDoc(),
  InternalServerErrorResponseDoc(),
);

// SHARED
const SenderIdParam: ApiParamOptions = {
  name: 'sender-id',
  description: 'The ID of the user who sent the friendship request',
  format: 'uuid',
};
const NotExistsError: TApiErrorRequestItemResponseProps = {
  status: HttpStatus.BAD_REQUEST,
  description: 'The friendship request does not exists',
  error: 'The friendship request does not exists',
};
// CREATE
export const CreateResponseDoc = createApiDocs(
  ApiParam({
    name: 'recipient-id',
    description: 'The ID of the user who will receive the friendship request',
    format: 'uuid',
  }),
  ApiSuccessRequestItemResponse({
    model: FriendshipPresenter,
    description:
      'A request for a new friendship has been successfully created. The status of the friendship is PENDING.',
    url: 'friendships/:recipient-id',
    method: 'POST',
    status: HttpStatus.CREATED,
  }),
  ApiErrorRequestItemResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Already exists a request for friendship between the users',
    error: 'A request for friendship already exists',
  }),
);
// ACCEPT
export const AcceptResponseDoc = createApiDocs(
  ApiParam(SenderIdParam),
  ApiSuccessRequestItemResponseNoContent({
    description: 'The friendship request has been successfully accepted',
    url: 'friendships/accept/:sender-id',
    method: 'PATCH',
  }),
  ApiErrorRequestItemResponse(NotExistsError),
);
// DECLINE
export const DeclineResponseDoc = createApiDocs(
  ApiParam(SenderIdParam),
  ApiSuccessRequestItemResponseNoContent({
    description: 'The friendship request has been successfully declined',
    url: 'friendships/decline/:sender-id',
    method: 'PATCH',
  }),
  ApiErrorRequestItemResponse(NotExistsError),
);
// MY FRIENDS
export const MyFriendsResponseDoc = createApiDocs(
  ApiSuccessRequestItemResponse({
    model: MyFriendsFriendshipPresenter,
    description: 'The list of friends has been successfully retrieved',
    url: 'friendships/my-friends',
    method: 'GET',
    status: HttpStatus.OK,
  }),
);
// REQUESTS
export const RequestsResponseDoc = createApiDocs(
  ApiSuccessRequestItemResponse({
    model: RequestsFriendshipPresenter,
    description: 'The list of requests has been successfully retrieved',
    url: 'friendships/requests',
    method: 'GET',
    status: HttpStatus.OK,
  }),
);
