import { PostService } from './service/post.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { GetPostDTO, PostDTO } from '../../libs/dto/post.dto';
import { ResponseWrapper } from '../../libs/dto/response-wrapper.dto';

@Controller('api')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('post')
  @HttpCode(HttpStatus.OK)
  async createPost(@Body() postDTO: PostDTO): Promise<ResponseWrapper> {
    await this.postService.createPost(postDTO);
    return ResponseWrapper.actionSucceed();
  }

  @Get('post')
  @HttpCode(HttpStatus.OK)
  async getPosts(): Promise<GetPostDTO[]> {
    const posts = await this.postService.getPosts();
    return posts;
  }

  @Get('post/:profileId')
  @HttpCode(HttpStatus.OK)
  async getUserPost(
    @Param('profileId') profileId: number,
  ): Promise<GetPostDTO[]> {
    await this.postService.getUserPosts(profileId);
    const result = await this.postService.getUserPosts(profileId);
    return result;
  }
}
