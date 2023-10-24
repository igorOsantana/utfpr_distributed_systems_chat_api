import { SetMetadata } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { createApiDocs } from 'src/shared/decorator.shared';
import { InternalServerErrorResponseDoc } from 'src/shared/doc.shared';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const AuthControllerDoc = createApiDocs(
  ApiTags('Authentication'),
  InternalServerErrorResponseDoc(),
);
