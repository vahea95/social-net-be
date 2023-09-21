import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './service/profile.service';
import { FirebaseService } from './service/firebase.service';
import { ProfileRepository } from '../../libs/repositories/auth.repository';

@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [FirebaseService, ProfileService, ProfileRepository],
})
export class ProfileModule {}
