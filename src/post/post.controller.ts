import { PostService } from './service/post.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { PostDTO } from '../../libs/dto/post.dto';
import { message } from '../../libs/utils/messages';

@Controller('api/auth')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('post')
  @HttpCode(HttpStatus.OK)
  async createPost(@Body() postDTO: PostDTO): Promise<Response> {
    await this.postService.createPost(postDTO);
    return Response.json(message.Success);
  }
}
