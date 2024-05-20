import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    if (context.getType() !== 'ws') {
      return true;
    }

    const allowUnauthorizedRequest = this.reflector.getAllAndOverride(
      'allowUnauthorizedRequest',
      [context.getHandler(), context.getClass()],
    );
    console.log(allowUnauthorizedRequest);

    const client: Socket = context.switchToWs().getClient();
    await this.validateToken(client);

    return true;
  }

  async validateToken(socket: Socket) {
    const { authentication } = socket.handshake.auth;
    if (!authentication) {
      throw new Error('You are unauthorized.');
    }

    return await this.jwtService.verifyAsync(authentication, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
