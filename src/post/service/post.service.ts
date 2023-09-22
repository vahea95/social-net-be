import { Injectable } from '@nestjs/common';
import { PostRepository } from '../../../libs/repositories/post.repository';
import { GetPostDTO, PostDTO } from '../../../libs/dto/post.dto';
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

  async getUserPosts(profileId: number): Promise<GetPostDTO[]> {
    try {
      const userPosts = await this.postRepository.findUserPosts(profileId);
      return userPosts.map((post) => ({
        id: post.id,
        image: post.image,
        postText: post.postText,
        title: post.title,
      }));
    } catch (error) {
      throw new InternalServerErrorException(message.getUserPosts);
    }
  }

  async getPosts(): Promise<GetPostDTO[]> {
    try {
      const posts = await this.postRepository.findAllPosts();
      return posts.map((post) => ({
        id: post.id,
        image: post.image,
        postText: post.postText,
        title: post.title,
      }));
    } catch (error) {
      throw new InternalServerErrorException(message.getAllPosts);
    }
  }
}
