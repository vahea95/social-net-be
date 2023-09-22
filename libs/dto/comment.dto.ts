import { IsNumber, IsString } from 'class-validator';

export class CommentDTO {
  @IsString()
  text: string;

  @IsNumber()
  profileId: number;

  @IsNumber()
  postId: number;
}
