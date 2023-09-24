import { Injectable } from '@nestjs/common';
import { CommentDTO } from '../../../libs/dto/comment.dto';
import { CommentRepository } from '../../../libs/repositories/comment.repository';
import { InternalServerErrorException } from '../../../libs/exceptions/internal-server';
import { message } from '../../../libs/utils/messages';
import { InsertResult } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async createComment(commentDTO: CommentDTO): Promise<InsertResult> {
    try {
      return await this.commentRepository.insert(commentDTO);
    } catch (error) {
      throw new InternalServerErrorException(message.createComment);
    }
  }

  async getPostComments(postId: number): Promise<CommentDTO[]> {
    try {
      const comments = await this.commentRepository.findPostComments(postId);
      return comments.map((comment) => ({
        id: comment.id,
        text: comment.text,
        profileId: comment.profileId,
        postId: comment.postId,
      }));
    } catch {
      throw new InternalServerErrorException(message.getPostComment);
    }
  }
}
