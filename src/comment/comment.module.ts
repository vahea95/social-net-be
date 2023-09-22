import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './service/comment.service';
import { CommentRepository } from '../../libs/repositories/comment.repository';

@Module({
  imports: [],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule {}
