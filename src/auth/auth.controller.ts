import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { ProfileDataDto } from '../../libs/dto/profile.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('profile')
  @HttpCode(HttpStatus.OK)
  async profileInfo(
    @Body() profileDTO: ProfileDataDto,
    @Req() req: Request,
  ): Promise<Response> {
    const verifiedToken = req['verifiedToken'];
    console.log(333, req.body);

    await this.authService.saveProfileInfo(profileDTO, verifiedToken);

    return Response.json('success');
  }
}
