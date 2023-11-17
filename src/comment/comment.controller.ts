import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post, UseInterceptors,
} from '@nestjs/common';
import { ResponseWrapper } from '../../libs/dto/response-wrapper.dto';
import { CommentDTO } from '../../libs/dto/comment.dto';
import { CommentService } from './service/comment.service';
import {VerifyTokenInterceptor} from "../../libs/interceptor/token.interceptor";
import {InsertResult} from "typeorm";

@Controller('api')
@UseInterceptors(VerifyTokenInterceptor)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('comment')
  @HttpCode(HttpStatus.OK)
  async createComment(
    @Body() commentDTO: CommentDTO,
  ): Promise<{ id: number; createdAt: Date }> {
    return await this.commentService.createComment(commentDTO);

  }

  @Get('comment/:postId')
  @HttpCode(HttpStatus.OK)
  async getUserPost(@Param('postId') postId: number): Promise<CommentDTO[]> {
    await this.commentService.getPostComments(postId);
    const result = await this.commentService.getPostComments(postId);
    return result;
  }
}
