import { IsNumber, IsString } from 'class-validator';

export class PostDTO {
  @IsString()
  text: string;

  @IsNumber()
  profileId: number;

  @IsNumber()
  postId: number;
}
