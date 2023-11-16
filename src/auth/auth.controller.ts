import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RequestUser, TRequestUser } from 'src/shared/decorator.shared';
import { UserServices } from 'src/user/user.service';
import { Public } from './auth.decorator';
import {
  AuthControllersDoc,
  MeResponseDoc,
  RegisterResponseDoc,
  SignInResponseDoc,
} from './auth.doc';
import { RegisterAuthDto, SignInAuthDto } from './auth.dto';
import {
  MePresenter,
  RegisterAuthPresenter,
  SignInAuthPresenter,
} from './auth.presenter';
import { AuthServices } from './auth.service';

@Controller('auth')
@AuthControllersDoc()
export class AuthControllers {
  constructor(
    private readonly authServices: AuthServices,
    private readonly userServices: UserServices,
  ) {}

  @Get('/me')
  @MeResponseDoc()
  async me(@RequestUser() reqUser: TRequestUser) {
    const user = await this.userServices.findById(reqUser.id);
    return new MePresenter(user);
  }

  @Public()
  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  @SignInResponseDoc()
  async signIn(@Body() dto: SignInAuthDto) {
    const { email, password } = dto;
    const accessToken = await this.authServices.signIn(email, password);
    return new SignInAuthPresenter(accessToken);
  }

  @Public()
  @Post('/register')
  @RegisterResponseDoc()
  async register(@Body() dto: RegisterAuthDto) {
    const accessToken = await this.authServices.register(dto);
    return new RegisterAuthPresenter(accessToken);
  }
}
