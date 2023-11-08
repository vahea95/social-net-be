import { PostService } from './service/post.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post, Query, Req, UseInterceptors,
} from '@nestjs/common';

import {allFeedDTO, allRelationalPostDTO, FeedDTO, GetRelationalPostDTO, PostDTO} from '../../libs/dto/post.dto';
import { ResponseWrapper } from '../../libs/dto/response-wrapper.dto';
import {VerifyTokenInterceptor} from "../../libs/interceptor/token.interceptor";

@Controller('api')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('post')
  @UseInterceptors(VerifyTokenInterceptor)
  @HttpCode(HttpStatus.OK)
  async createPost(@Body() postDTO: PostDTO): Promise<ResponseWrapper> {
    await this.postService.createPost(postDTO);
    return ResponseWrapper.actionSucceed();
  }


  @Get('feed')
  @UseInterceptors(VerifyTokenInterceptor)
  @HttpCode(HttpStatus.OK)
  async getPosts(@Req() req:Request, @Query('page') page: number): Promise<allFeedDTO> {
    const authUserId = req['verifiedToken'];

    const posts = await this.postService.getPosts(authUserId, page);
    console.log(posts)
    return posts;
  }

  @Get('guest')
  @HttpCode(HttpStatus.OK)
  async getGuestPosts(@Req() req:Request, @Query('page') page: number): Promise<allFeedDTO> {
    const posts = await this.postService.getPostsForGuests(page);
    return posts;
  }

  @Get('post/:profileId')
  @UseInterceptors(VerifyTokenInterceptor)
  @HttpCode(HttpStatus.OK)
  async getRelationPost(
      @Param('profileId') profileId: number,
      @Query('page') page: number,
  ): Promise<allRelationalPostDTO>{
    const result = await this.postService.getRelationalPosts(profileId, page);
    return result;
  }

  @Delete('post/:id')
  @UseInterceptors(VerifyTokenInterceptor)
  @HttpCode(HttpStatus.OK)
  async deletePost(@Param('id') id: number): Promise<ResponseWrapper> {
    await this.postService.deletePost(id);
    return ResponseWrapper.actionSucceed();
  }

  @Patch('post/:id')
  @UseInterceptors(VerifyTokenInterceptor)
  @HttpCode(HttpStatus.OK)
  async updatePost(
      @Param('id') id: number,
      @Body() postDTO: PostDTO,
  ): Promise<ResponseWrapper> {
    await this.postService.updatePost(id, postDTO);
    return ResponseWrapper.actionSucceed();
  }
}
