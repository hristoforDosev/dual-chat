import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import AuthDto from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() signInDto: AuthDto) {
    return this.authService.signIn(signInDto);
  }
}
