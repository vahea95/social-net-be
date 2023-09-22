import { IsNumber, IsString } from 'class-validator';

export class PostDTO {
  @IsString()
  image: string;

  @IsString()
  postText: string;

  @IsString()
  title: string;

  @IsNumber()
  profileId: number;
}

export class GetPostDTO {
  @IsString()
  image?: string;

  @IsString()
  postText: string;

  @IsString()
  title: string;
}
