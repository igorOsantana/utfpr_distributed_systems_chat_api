import { HttpStatus } from '@nestjs/common';
import {
  ApiErrorRequestItemResponse,
  ApiSuccessRequestItemResponse,
  createApiDocs,
} from 'src/shared/decorator.shared';
import { ChatPresenter } from './chat.presenter';

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
    status: HttpStatus.NOT_FOUND,
    description: 'The recipient was not found.',
    error: 'Recipient not found',
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
    status: HttpStatus.NOT_FOUND,
    description: 'The chat was not found.',
    error: 'Chat not found',
  }),
);
