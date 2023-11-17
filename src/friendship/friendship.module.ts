import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/database/database.module';
import { FriendshipControllers } from './friendship.controller';
import { FriendshipServices } from './friendship.service';

@Module({
  imports: [DatabaseModule],
  controllers: [FriendshipControllers],
  providers: [FriendshipServices],
  exports: [FriendshipServices],
})
export class FriendshipModule {}
