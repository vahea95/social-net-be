import { Controller, Get, Inject } from '@nestjs/common';
import { AuthService } from './service/auth.service';

@Controller('api/auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Get('/hello')
  getHello(): string {
    return this.authService.getHello();
  }
}
