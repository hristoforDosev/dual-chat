import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import AuthDto from './dto/auth.dto';
import { AllowUnauthorizedDecorator } from './decorators/allow-unauthorized.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @AllowUnauthorizedDecorator()
  @Post('login')
  signIn(@Body() signInDto: AuthDto) {
    return this.authService.signIn(signInDto);
  }
}
