import {
  Module,
  NestModule,
} from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { DefaultDatabaseConfiguration } from '../libs/config/database.config';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    DefaultDatabaseConfiguration(),
    ProfileModule,
    PostModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule  {}
