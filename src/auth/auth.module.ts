import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { FirebaseService } from './service/firebase.service';
import { ProfileRepository } from '../../libs/repositories/auth.repository';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [FirebaseService, AuthService, ProfileRepository],
})
export class AuthModule {}
