import { ApiTags } from '@nestjs/swagger';
import { createApiDocs } from 'src/shared/decorator.shared';
import {
  InternalServerErrorResponseDoc,
  UnauthorizedResponseDoc,
} from 'src/shared/doc.shared';

export const UserControllersDoc = createApiDocs(
  ApiTags('Users'),
  UnauthorizedResponseDoc(),
  InternalServerErrorResponseDoc(),
);