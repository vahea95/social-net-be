import { Injectable } from '@nestjs/common';
import { PostRepository } from '../../../libs/repositories/post.repository';
import { PostDTO } from '../../../libs/dto/post.dto';
import { InsertResult } from 'typeorm';
import { InternalServerErrorException } from '../../../libs/exceptions/internal-server';
import { message } from '../../../libs/utils/messages';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async createPost(postDTO: PostDTO): Promise<InsertResult> {
    try {
      return await this.postRepository.insert({
        ...postDTO,
      });
    } catch (error) {
      throw new InternalServerErrorException(message.createPost);
    }
  }
}
