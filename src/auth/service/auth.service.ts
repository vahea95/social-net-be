import { Injectable } from '@nestjs/common';
import { ProfileDataDto } from '../../../libs/dto/profile.dto';
import { ProfileRepository } from '../../../libs/repositories/auth.repository';
import { InsertResult } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async saveProfileInfo(
    profileDTO: ProfileDataDto,
    authUserId: string,
  ): Promise<InsertResult> {
    try {
      return await this.profileRepository.insert({
        ...profileDTO,
        authUserId: authUserId,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}
