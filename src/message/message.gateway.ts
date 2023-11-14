import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthServices } from 'src/auth/auth.service';
import { ChatEntity } from 'src/chat/chat.entity';
import { TEventCreateNewChatInput } from 'src/chat/chat.interface';
import { ChatPresenter } from 'src/chat/chat.presenter';
import { ChatUseCases } from 'src/chat/chat.usecase';
import { MessageEntity } from './message.entity';
import { TEventSendNewMessageInput } from './message.interface';
import { MessageUseCases } from './message.usecase';

@WebSocketGateway(undefined, {
  transports: ['websocket'],
  cors: '*',
})
export class MessageWebSocketGateway implements OnGatewayConnection {
  private connectedClients: Map<string, Socket> = new Map();
  constructor(
    private readonly authServices: AuthServices,
    private readonly chatUseCases: ChatUseCases,
    private readonly messageUseCases: MessageUseCases,
  ) {}

  async handleConnection(client: Socket) {
    console.log('trying to connecting');
    const userId = await this.extractUserIdFromSocket(client);

    if (userId) {
      this.connectedClients.set(userId, client);
      console.log('connected: ', userId);
    } else {
      console.error('Missing token.');
      client.disconnect();
    }
  }

  @SubscribeMessage('createNewChat')
  async createNewChat(client: Socket, payload: TEventCreateNewChatInput) {
    try {
      const reqUserId = await this.extractUserIdFromSocket(client);

      const newChat = await this.chatUseCases.create({
        ...payload,
        senderId: reqUserId,
      });
      newChat.setDataByReqUserId(reqUserId);

      const recipientId = newChat.recipient.id;
      const recipientClient = this.connectedClients.get(recipientId);

      this.emitReceiveNewChatEvent(
        client,
        newChat,
        reqUserId,
        recipientClient,
        recipientId,
      );
    } catch (error) {
      console.error(error);
    }
  }

  private emitReceiveNewChatEvent(
    client: Socket,
    newChat: ChatEntity,
    reqUserId: string,
    recipientClient: Socket,
    recipientId: string,
  ) {
    client.emit('receiveNewChat', new ChatPresenter(newChat, reqUserId));

    if (recipientClient) {
      recipientClient.emit(
        'receiveNewChat',
        new ChatPresenter(newChat, recipientId),
      );
    }
  }

  @SubscribeMessage('sendNewMessage')
  async sendNewMessage(client: Socket, payload: TEventSendNewMessageInput) {
    try {
      const userId = await this.extractUserIdFromSocket(client);

      const chat = await this.chatUseCases.findById(payload.chatId);
      chat.setDataByReqUserId(userId);

      const recipientClient = this.connectedClients.get(chat.recipient.id);
      const newMessage = await this.messageUseCases.send({
        ...payload,
        ownerId: userId,
      });

      this.emitReceiveNewMessageEvent(client, newMessage, recipientClient);
    } catch (error) {
      console.error(error);
    }
  }

  private emitReceiveNewMessageEvent(
    client: Socket,
    newMessage: MessageEntity,
    recipientClient: Socket,
  ) {
    client.emit('receiveNewMessage', newMessage);

    if (recipientClient) {
      recipientClient.emit('receiveNewMessage', newMessage);
    }
  }

  private async extractUserIdFromSocket(
    socket: Socket,
  ): Promise<string | null> {
    const token = socket.handshake.query.token;
    if (token && typeof token === 'string') {
      const payload = await this.authServices.verifyToken(token);
      return payload.sub;
    }

    return null;
  }
}
