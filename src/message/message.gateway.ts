import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthServices } from 'src/auth/auth.service';
import { TEventCreateNewChatInput } from 'src/chat/chat.interface';
import { ChatUseCases } from 'src/chat/chat.usecase';
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
      const userId = await this.extractUserIdFromSocket(client);
      const newChat = await this.chatUseCases.create({
        ...payload,
        senderId: userId,
      });
      const recipient = newChat.getRecipient(userId);
      const recipientClient = this.connectedClients.get(recipient.id);
      client.emit('receiveNewChat', newChat);
      if (recipientClient) {
        recipientClient.emit('receiveNewChat', newChat);
      }
    } catch (error) {
      console.error(error);
    }
  }

  @SubscribeMessage('sendNewMessage')
  async sendNewMessage(client: Socket, payload: TEventSendNewMessageInput) {
    try {
      const userId = await this.extractUserIdFromSocket(client);
      const chat = await this.chatUseCases.findById(payload.chatId);
      const recipient = chat.getRecipient(userId);
      const recipientClient = this.connectedClients.get(recipient.id);
      const newMessage = await this.messageUseCases.send({
        ...payload,
        ownerId: userId,
      });
      client.emit('receiveNewMessage', newMessage);
      if (recipientClient) {
        recipientClient.emit('receiveNewMessage', newMessage);
      }
    } catch (error) {
      console.error(error);
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
