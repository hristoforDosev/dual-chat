import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    if (context.getType() !== 'ws') {
      return true;
    }

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
