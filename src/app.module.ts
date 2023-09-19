import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DefaultDatabaseConfiguration } from '../libs/config/database.config';
import { verifyToken } from '../libs/middleware/middleware';

@Module({
  imports: [DefaultDatabaseConfiguration(), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyToken).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
