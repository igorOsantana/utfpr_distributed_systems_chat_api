import { Controller, Get, Param } from '@nestjs/common';
import { UserControllersDoc } from './user.decorator';
import { FindByIdOrEmailResponseDoc } from './user.doc';
import { UserPresenter } from './user.presenter';
import { UserServices } from './user.service';

@Controller('users')
@UserControllersDoc()
export class UserControllers {
  constructor(private readonly userService: UserServices) {}

  @Get('/:idOrEmail')
  @FindByIdOrEmailResponseDoc()
  async findByIdOrEmail(@Param('idOrEmail') idOrEmail: string) {
    const user = await this.userService.findByIdOrEmail(idOrEmail);
    return new UserPresenter(user);
  }
}
