import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './service/post.service';
import { PostRepository } from '../../libs/repositories/post.repository';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
