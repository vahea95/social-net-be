import { Injectable } from '@nestjs/common';
import { getProfileDTO, ProfileDTO } from '../../../libs/dto/profile.dto';
import { ProfileRepository } from '../../../libs/repositories/profile.repository';
import {InsertResult, UpdateResult} from 'typeorm';
import { InternalServerErrorException } from '../../../libs/exceptions/internal-server';
import { NotFoundException } from '../../../libs/exceptions/not-found.exception';
import { message } from '../../../libs/utils/messages';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async createProfile(
      profileDTO: ProfileDTO,
      authUserId: string,
  ): Promise<InsertResult> {
    try {
      return await this.profileRepository.insert({
        ...profileDTO,
        authUserId,
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(message.createProfile);
    }
  }

  async getProfile(authUserId: string): Promise<getProfileDTO> {
    try {
      const profile = await this.profileRepository.findOneProfile(authUserId);
      if (!profile) throw new NotFoundException(message.profileNotFound);
      return profile;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(message.getProfile);
    }
  }

  async updateProfile(authUserId : string, profileDto : ProfileDTO) : Promise<UpdateResult>{
    try {
      return await this.profileRepository.updateAvatar(authUserId,profileDto)
    }
    catch(error) {
      throw new InternalServerErrorException(message.avatarImage);
    }


  }
}
