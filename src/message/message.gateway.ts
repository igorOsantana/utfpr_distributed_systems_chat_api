import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthServices } from 'src/auth/auth.service';
import { ChatUseCases } from 'src/chat/chat.usecase';
import { TEventSendNewMessageInput } from './message.interface';
import { MessageUseCases } from './message.usecase';

@WebSocketGateway(undefined, { path: '/chats', transports: ['websocket'] })
export class MessageWebSocketGateway implements OnGatewayConnection {
  private connectedClients: Map<string, Socket> = new Map();
  constructor(
    private readonly authServices: AuthServices,
    private readonly chatUseCases: ChatUseCases,
    private readonly messageUseCases: MessageUseCases,
  ) {}

  async handleConnection(client: Socket) {
    const userId = await this.extractUserIdFromSocket(client);

    if (userId) {
      this.connectedClients.set(userId, client);
    } else {
      console.error('Missing token.');
      client.disconnect();
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
    const handshakeData = socket.request;

    if (handshakeData.headers && handshakeData.headers.authorization) {
      const token = handshakeData.headers.authorization.split(' ')[1];
      const payload = await this.authServices.verifyToken(token);
      return payload.sub;
    }

    return null;
  }
}
