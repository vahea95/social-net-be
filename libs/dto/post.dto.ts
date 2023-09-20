import { IsEmail, IsNumber, IsString } from 'class-validator';

export class PostDTO {
  @IsString()
  image: string;

  @IsString()
  postText: string;

  @IsEmail()
  title: string;

  @IsNumber()
  profileId: number;
}
