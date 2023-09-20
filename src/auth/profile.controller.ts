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
import { ProfileDTO } from '../../libs/dto/profile.dto';
import { message } from '../../libs/utils/messages';

@Controller('api/auth')
export class ProfileController {
  constructor(private readonly authService: ProfileService) {}

  @Post('profile')
  @HttpCode(HttpStatus.OK)
  async profileInfo(
    @Body() profileDTO: ProfileDTO,
    @Req() req: Request,
  ): Promise<Response> {
    const verifiedToken = req['verifiedToken'];

    await this.authService.saveProfile(profileDTO, verifiedToken);

    return Response.json(message.Success);
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async getByAuthId(id: number): Promise<ProfileDTO> {
    const result = await this.authService.getPostByProfileId(id);
    return result;
  }
}
