import { Socket } from 'socket.io';
import { WsJwtGuard } from './ws-jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

type SocketIOMiddleware = (socket: Socket, next: (err?: any) => void) => void;

export const SocketAuthMiddleware =
  (jwtService: JwtService, configService: ConfigService): SocketIOMiddleware =>
  async (socket, next) => {
    try {
      await new WsJwtGuard(
        jwtService,
        configService,
        new Reflector(),
      ).validateToken(socket);
      next();
    } catch (error) {
      next(error);
    }
  };
