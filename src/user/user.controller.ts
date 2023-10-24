import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindByIdOrEmailResponseDoc } from './user.doc';
import { UserPresenter } from './user.presenter';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:idOrEmail')
  @FindByIdOrEmailResponseDoc()
  async findByIdOrEmail(@Param('idOrEmail') idOrEmail: string) {
    const user = await this.userService.findByIdOrEmail(idOrEmail);
    return new UserPresenter(user);
  }
}
