import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UserExceptions } from 'src/user/user.exception';
import { TCreateUser } from 'src/user/user.interface';
import { UserService } from 'src/user/user.service';
import { AuthExceptions } from './auth.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async hash(input: string): Promise<string> {
    try {
      return await hash(input, 10);
    } catch (error) {
      throw new AuthExceptions().hash(error);
    }
  }

  async compare(input: string, hash: string): Promise<boolean> {
    try {
      return await compare(input, hash);
    } catch (error) {
      throw new AuthExceptions().compare(error);
    }
  }

  generateToken(userId: string): string {
    try {
      const payload = { sub: userId };
      return this.jwtService.sign(payload);
    } catch (error) {
      throw new AuthExceptions().generateToken(error);
    }
  }

  async signIn(email: string, password: string): Promise<string> {
    try {
      const user = await this.userService.findByEmail(email);
      const isPasswordValid = await this.compare(password, user.password);

      if (!isPasswordValid) {
        throw new AuthExceptions().invalidCredentials();
      }

      return this.generateToken(user.id);
    } catch (error) {
      if (
        UserExceptions.isOwnException(error) ||
        AuthExceptions.isOwnException(error)
      ) {
        throw new AuthExceptions().invalidCredentials();
      }
      throw new AuthExceptions().signIn(error);
    }
  }

  async register(input: TCreateUser): Promise<string> {
    try {
      const emailExists = await this.emailExists(input.email);

      if (emailExists) {
        throw new UserExceptions().emailInUse();
      }

      const user = await this.userService.create({
        ...input,
        password: await this.hash(input.password),
      });
      return this.generateToken(user.id);
    } catch (error) {
      if (UserExceptions.isOwnException(error)) {
        throw error;
      }
      throw new AuthExceptions().register(error);
    }
  }

  private async emailExists(email: string): Promise<boolean> {
    try {
      await this.userService.findByEmail(email);
      return true;
    } catch (error) {
      if (UserExceptions.isOwnException(error)) {
        return false;
      }
      throw new AuthExceptions().register(error);
    }
  }
}
