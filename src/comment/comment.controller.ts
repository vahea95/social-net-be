import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {ResponseWrapper} from '../../libs/dto/response-wrapper.dto';
import {CommentDTO} from '../../libs/dto/comment.dto';
import {CommentService} from './service/comment.service'

@Controller('api')
export class CommentController {
  constructor(private readonly commentService: CommentService) {
  }


  @Post('comment')
  @HttpCode(HttpStatus.OK)
  async createComment(
    @Body() commentDTO: CommentDTO,
  ): Promise<ResponseWrapper> {
    await this.commentService.createComment(commentDTO)
    return ResponseWrapper.actionSucceed();
  }
}