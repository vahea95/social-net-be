import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { DefaultDatabaseConfiguration } from '../libs/config/database.config';
import { verifyToken } from '../libs/middleware/middleware';
import { PostModule } from './post/post.module';

@Module({
  imports: [DefaultDatabaseConfiguration(), ProfileModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(verifyToken).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
