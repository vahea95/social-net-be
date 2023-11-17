import { Injectable } from '@nestjs/common';
import { CommentDTO} from '../../../libs/dto/comment.dto';
import { CommentRepository } from '../../../libs/repositories/comment.repository';
import { InternalServerErrorException } from '../../../libs/exceptions/internal-server';
import { message } from '../../../libs/utils/messages';
import { InsertResult } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async createComment(commentDTO: CommentDTO): Promise<{  id: number , createdAt : Date}> {
    try {
       await this.commentRepository.insert(commentDTO);
      const id = commentDTO.id
      const createdAt = commentDTO.created_at
      return {
        id,
        createdAt
      }
    } catch (error) {
      throw new InternalServerErrorException(message.createComment);
    }
  }

  async getPostComments(postId: number): Promise<CommentDTO[]> {
    try {
      const comments = await this.commentRepository.findPostComments(postId);
      console.log(comments)
      return comments.map((comment) => ({
        id: comment.id,
        text: comment.text,
        profileId: comment.profileId,
        postId: comment.postId,
        created_at:comment.created_at,
        userName: comment.profile.name,
        userSurname: comment.profile.surname,
    }))
    }catch {
      throw new InternalServerErrorException(message.getPostComment);
    }
  }
}
