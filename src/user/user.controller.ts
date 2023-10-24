import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import {
  ApiErrorRequestItemResponse,
  ApiSuccessRequestItemResponse,
} from 'src/shared/decorator.shared';
import {
  FindByIdOrEmailNotFoundResponse,
  FindByIdOrEmailParam,
  FindByIdOrEmailSuccessResponse,
} from './user.doc';
import { UserPresenter } from './user.presenter';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:idOrEmail')
  @ApiParam(FindByIdOrEmailParam)
  @ApiSuccessRequestItemResponse(FindByIdOrEmailSuccessResponse)
  @ApiErrorRequestItemResponse(FindByIdOrEmailNotFoundResponse)
  async findByIdOrEmail(@Param('idOrEmail') idOrEmail: string) {
    const user = await this.userService.findByIdOrEmail(idOrEmail);
    return new UserPresenter(user);
  }
}
