import { Injectable } from '@nestjs/common';
import { DatabaseServices } from 'src/shared/database/database.service';
import { UserEntity } from './user.entity';
import { UserExceptions } from './user.exception';
import { TCreateUserInput } from './user.interface';

@Injectable()
export class UserServices {
  constructor(private readonly databaseServices: DatabaseServices) {}

  async create(input: TCreateUserInput): Promise<UserEntity> {
    try {
      return await this.databaseServices.user.create({
        data: input,
      });
    } catch (error) {
      throw new UserExceptions().create(error);
    }
  }

  async findById(id: string): Promise<UserEntity> {
    try {
      const user = await this.databaseServices.user.findUnique({
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
      const user = await this.databaseServices.user.findUnique({
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
      const user = await this.databaseServices.user.findFirst({
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
