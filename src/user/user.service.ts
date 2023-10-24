import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/shared/database/database.service';
import { UserEntity } from './user.entity';
import { UserExceptions } from './user.exception';
import { TCreateUser } from './user.interface';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(input: TCreateUser): Promise<UserEntity> {
    try {
      return await this.databaseService.users.create({
        data: input,
      });
    } catch (error) {
      throw new UserExceptions().create(error);
    }
  }

  async findById(id: string): Promise<UserEntity> {
    try {
      const user = await this.databaseService.users.findUnique({
        where: { id },
      });

      if (!user) {
        throw new UserExceptions().notFound();
      }

      return user;
    } catch (error) {
      if (UserExceptions.isOwnException(error)) {
        throw error;
      }

      throw new UserExceptions().find(error);
    }
  }

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.databaseService.users.findUnique({
        where: { email },
      });

      if (!user) {
        throw new UserExceptions().notFound();
      }

      return user;
    } catch (error) {
      if (UserExceptions.isOwnException(error)) {
        throw error;
      }

      throw new UserExceptions().find(error);
    }
  }

  async findByIdOrEmail(idOrEmail: string): Promise<UserEntity> {
    try {
      const user = await this.databaseService.users.findFirst({
        where: {
          OR: [{ id: idOrEmail }, { email: idOrEmail }],
        },
      });

      if (!user) {
        throw new UserExceptions().notFound();
      }

      return user;
    } catch (error) {
      if (UserExceptions.isOwnException(error)) {
        throw error;
      }

      throw new UserExceptions().find(error);
    }
  }
}
