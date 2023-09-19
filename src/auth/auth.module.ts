import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { FirebaseService } from './service/firebase.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [FirebaseService, AuthService],
})
export class AuthModule {}
