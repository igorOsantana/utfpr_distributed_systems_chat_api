import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ChatModule } from 'src/chat/chat.module';
import { DatabaseModule } from 'src/shared/database/database.module';
import { MessageControllers } from './message.controller';
import { MessageWebSocketGateway } from './message.gateway';
import { MessageServices } from './message.service';
import { MessageUseCases } from './message.usecase';

@Module({
  imports: [DatabaseModule, ChatModule, AuthModule],
  controllers: [MessageControllers],
  providers: [MessageUseCases, MessageServices, MessageWebSocketGateway],
  exports: [MessageUseCases, MessageServices, MessageWebSocketGateway],
})
export class MessageModule {}
