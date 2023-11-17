import { HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiErrorRequestItemResponse,
  ApiSuccessRequestItemResponse,
  createApiDocs,
} from 'src/shared/decorator.shared';
import {
  InternalServerErrorResponseDoc,
  UnauthorizedResponseDoc,
} from 'src/shared/doc.shared';
import { ChatListPresenter, ChatPresenter } from './chat.presenter';

// CONTROLLERS
export const ChatControllersDoc = createApiDocs(
  ApiTags('Chats'),
  UnauthorizedResponseDoc(),
  InternalServerErrorResponseDoc(),
);
// CREATE
export const CreateResponseDoc = createApiDocs(
  ApiSuccessRequestItemResponse({
    model: ChatPresenter,
    description: 'A new chat has been successfully created.',
    url: 'chats/',
    method: 'POST',
    status: HttpStatus.CREATED,
  }),
  ApiErrorRequestItemResponse({
    description: 'The chat already exists.',
    error: 'Chat already exists',
    status: HttpStatus.CONFLICT,
  }),
  ApiErrorRequestItemResponse({
    description: 'The recipient was not found.',
    error: 'Recipient not found',
    status: HttpStatus.NOT_FOUND,
  }),
);
// FIND ALL
export const FindAllResponseDoc = createApiDocs(
  ApiSuccessRequestItemResponse({
    model: ChatListPresenter,
    description: 'The chats are listed.',
    url: 'chats/:userId',
    method: 'GET',
    status: HttpStatus.OK,
  }),
);
// MARK AS READ
export const MarkAsReadResponseDoc = createApiDocs(
  ApiSuccessRequestItemResponse({
    model: ChatPresenter,
    description: 'The chat was marked as read successfully.',
    url: 'chats/:id',
    method: 'PATCH',
    status: HttpStatus.NO_CONTENT,
  }),
  ApiErrorRequestItemResponse({
    description: 'The chat was not found.',
    error: 'Chat not found',
    status: HttpStatus.NOT_FOUND,
  }),
);
