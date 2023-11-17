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
import { MessageListPresenter, MessagePresenter } from './message.presenter';

// CONTROLLERS
export const MessageControllersDoc = createApiDocs(
  ApiTags('Messages'),
  UnauthorizedResponseDoc(),
  InternalServerErrorResponseDoc(),
);

// FIND ALL
export const FindAllResponseDoc = createApiDocs(
  ApiSuccessRequestItemResponse({
    model: MessageListPresenter,
    description: 'The chat messages list',
    url: 'messages/:chat-id',
    method: 'GET',
    status: HttpStatus.OK,
  }),
);
// SEND
export const SendResponseDoc = createApiDocs(
  ApiSuccessRequestItemResponse({
    model: MessagePresenter,
    description: 'A new message has been successfully sent.',
    url: 'messages/:chat-id',
    method: 'POST',
    status: HttpStatus.CREATED,
  }),
  ApiErrorRequestItemResponse({
    description: 'The chat was not found.',
    error: 'Chat not found',
    status: HttpStatus.NOT_FOUND,
  }),
);
