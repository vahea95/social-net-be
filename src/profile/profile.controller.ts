import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus, Patch,
  Post,
  Req, UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './service/profile.service';
import { getProfileDTO, ProfileDTO } from '../../libs/dto/profile.dto';
import { ResponseWrapper } from '../../libs/dto/response-wrapper.dto';
import {VerifyTokenInterceptor} from "../../libs/interceptor/token.interceptor";

@Controller('api')
@UseInterceptors(VerifyTokenInterceptor)
export class ProfileController {
  constructor(private readonly authService: ProfileService) {}

  @Post('profile')
  @HttpCode(HttpStatus.OK)
  async profileInfo(
      @Body() profileDTO: ProfileDTO,
      @Req() req: Request,
  ): Promise<ResponseWrapper> {
    const authUserId = req['verifiedToken'];
    console.log(authUserId);
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

  @Patch('profile')
  @HttpCode(HttpStatus.OK)
  async updateAvatar(@Req() req, @Body() profileDto : ProfileDTO) : Promise<ResponseWrapper>{
    const AuthUserUuid = req['verifiedToken'];
    await this.authService.updateProfile(AuthUserUuid, profileDto);
    return ResponseWrapper.actionSucceed();
  }
}
