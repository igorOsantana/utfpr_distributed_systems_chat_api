import { Module } from '@nestjs/common';
import { ChatModule } from 'src/chat/chat.module';
import { DatabaseModule } from 'src/shared/database/database.module';
import { MessageControllers } from './message.controller';
import { MessageServices } from './message.service';
import { MessageUseCases } from './message.usecase';

@Module({
  imports: [DatabaseModule, ChatModule],
  controllers: [MessageControllers],
  providers: [MessageUseCases, MessageServices],
  exports: [MessageUseCases, MessageServices],
})
export class MessageModule {}
