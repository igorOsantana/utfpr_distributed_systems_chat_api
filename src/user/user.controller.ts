import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiErrorRequestItemResponse,
  ApiSuccessRequestItemResponse,
} from 'src/shared/decorator.shared';
import { FindByIdNotFoundResponse, FindByIdSuccessResponse } from './user.doc';
import { UserPresenter } from './user.presenter';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  @ApiSuccessRequestItemResponse(FindByIdSuccessResponse)
  @ApiErrorRequestItemResponse(FindByIdNotFoundResponse)
  async findById(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    return new UserPresenter(user);
  }
}
