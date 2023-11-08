import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './service/post.service';
import { PostRepository } from '../../libs/repositories/post.repository';
import {CommentRepository} from "../../libs/repositories/comment.repository";

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService, PostRepository, CommentRepository],
})
export class PostModule {}
