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
    } catch {
      throw new InternalServerErrorException(message.createComment);
    }
  }
}
