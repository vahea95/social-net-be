import { PostService } from './service/post.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { PostDTO } from '../../libs/dto/post.dto';
import { ResponseWrapper } from '../../libs/dto/response-wrapper.dto';

@Controller('api/auth')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('post')
  @HttpCode(HttpStatus.OK)
  async createPost(@Body() postDTO: PostDTO): Promise<ResponseWrapper> {
    await this.postService.createPost(postDTO);
    return ResponseWrapper.actionSucceed();
  }
}
