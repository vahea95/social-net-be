import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { ProfileService } from './service/profile.service';
import { getProfileDTO, ProfileDTO } from '../../libs/dto/profile.dto';
import { ResponseWrapper } from '../../libs/dto/response-wrapper.dto';

@Controller('api')
export class ProfileController {
  constructor(private readonly authService: ProfileService) {}

  @Post('profile')
  @HttpCode(HttpStatus.OK)
  async profileInfo(
    @Body() profileDTO: ProfileDTO,
    @Req() req: Request,
  ): Promise<ResponseWrapper> {
    const authUserId = req['verifiedToken'];

    await this.authService.createProfile(profileDTO, authUserId);

    return ResponseWrapper.actionSucceed();
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async getByAuthId(@Req() req: Request): Promise<getProfileDTO> {
    const AuthUserUuid = req['verifiedToken'];

    const result = await this.authService.getProfile(AuthUserUuid);
    return result;
  }
}
