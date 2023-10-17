import { ApiProperty } from '@nestjs/swagger';
import { UserPresenter } from 'src/user/user.presenter';

export class SignInAuthPresenter {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5NzUwODgyMywiaWF0IjoxNjk3NTA4ODIzfQ.4T3NQAKlUKih0yYu3Z0BFvMoY1h4w_2ejoD4RWC6iZs',
  })
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}

export class RegisterAuthPresenter extends SignInAuthPresenter {}

export class MePresenter extends UserPresenter {}
