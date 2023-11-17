import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/database/database.module';
import { UserControllers } from './user.controller';
import { UserServices } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserControllers],
  providers: [UserServices],
  exports: [UserServices],
})
export class UsersModule {}
