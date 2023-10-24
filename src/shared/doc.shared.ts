import { HttpStatus } from '@nestjs/common';
import { TApiErrorRequestItemResponseProps } from 'src/shared/decorator.shared';

export const UnauthorizedResponse: TApiErrorRequestItemResponseProps = {
  status: HttpStatus.UNAUTHORIZED,
  description: 'Request user unauthorized.',
  error: 'You are not authorized',
};
