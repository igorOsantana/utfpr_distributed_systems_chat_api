import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestUser, TRequestUser } from 'src/shared/decorator.shared';
import { UserService } from 'src/user/user.service';
import { Public } from './auth.decorator';
import {
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
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('/me')
  @MeResponseDoc()
  async me(@RequestUser() reqUser: TRequestUser) {
    const user = await this.userService.findById(reqUser.id);
    return new MePresenter(user);
  }

  @Public()
  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  @SignInResponseDoc()
  async signIn(@Body() dto: SignInAuthDto) {
    const { email, password } = dto;
    const accessToken = await this.authService.signIn(email, password);
    return new SignInAuthPresenter(accessToken);
  }

  @Public()
  @Post('/register')
  @RegisterResponseDoc()
  async register(@Body() dto: RegisterAuthDto) {
    const accessToken = await this.authService.register(dto);
    return new RegisterAuthPresenter(accessToken);
  }
}
