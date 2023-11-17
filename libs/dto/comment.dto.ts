
import {IsDate, IsNumber, IsString} from 'class-validator';

export class CommentDTO {
  @IsNumber()
  id: number

  @IsString()
  text: string;

  @IsNumber()
  profileId: number;

  @IsNumber()
  postId: number;

  @IsString()
  userName: string

  @IsString()
  userSurname: string

  @IsDate()
  created_at: Date;
}

export class CommentWithIdDTO {
  @IsNumber()
  id : number

  @IsString()
  created_at: Date

}