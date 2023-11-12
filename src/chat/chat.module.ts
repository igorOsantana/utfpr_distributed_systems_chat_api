import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/database/database.module';
import { UsersModule } from 'src/user/user.module';
import { ChatControllers } from './chat.controller';
import { ChatServices } from './chat.service';
import { ChatUseCases } from './chat.usecase';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [ChatControllers],
  providers: [ChatUseCases, ChatServices],
  exports: [ChatUseCases, ChatServices],
})
export class ChatModule {}
