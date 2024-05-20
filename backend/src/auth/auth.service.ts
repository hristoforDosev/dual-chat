import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import AuthDto from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(signInDto: AuthDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(
      signInDto.username,
      signInDto.password,
    );
    if (!user) {
      throw new NotFoundException('Invalid username or password');
    }

    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
      }),
    };
  }
}
