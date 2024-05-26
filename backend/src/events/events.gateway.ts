import { Injectable, Logger, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { SOCKET_CONFIG } from './config';
import { ChatEvents } from './events';
import { OpenaiService } from '../openai/openai.service';
import { WsJwtGuard } from '../auth/ws-jwt/ws-jwt.guard';
import { SocketAuthMiddleware } from '../auth/ws-jwt/ws.mw';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
@UseGuards(WsJwtGuard)
@WebSocketGateway(SOCKET_CONFIG.PORT, SOCKET_CONFIG.OPTIONS)
export class EventsGateway {
  @WebSocketServer()
  private readonly server: Server;
  private readonly logger = new Logger(EventsGateway.name);

  constructor(
    private readonly openAiService: OpenaiService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  afterInit(client: Socket) {
    client.use(
      SocketAuthMiddleware(this.jwtService, this.configService) as any,
    );
  }

  @SubscribeMessage(ChatEvents.SendMessage)
  async handleSendMessage(
    @MessageBody()
    payload: {
      message: string;
      to: string;
    },
  ) {
    const { to, message } = payload;
    const response = await this.openAiService.chatGptRequest(message, []);

    this.server.to(to).emit(ChatEvents.ReceiveOpenAiMessage, {
      message: response,
    });

    this.server.to(to).emit(ChatEvents.ReceiveMessage, {
      message,
    });

    this.logger.debug(`socket event: ${ChatEvents.SendMessage} received.`);
  }

  @SubscribeMessage(ChatEvents.JoinRoom)
  async handleJoinRoom(
    @MessageBody()
    payload: { roomName: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(payload.roomName);

    this.logger.debug(
      `socket event: ${ChatEvents.JoinRoom} from client: ${client.id} received.`,
    );
  }
}
