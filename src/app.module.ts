import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { FriendshipModule } from './friendship/friendship.module';
import { MessageModule } from './message/message.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ChatModule,
    FriendshipModule,
    MessageModule,
    UsersModule,
  ],
})
export class AppModule {}
