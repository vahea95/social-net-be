import { IsNumber, IsString } from 'class-validator';
import {CommentDTO} from "./comment.dto";



export class PostDTO {
  @IsString()
  imageUrl: string;

  @IsString()
  postText: string;

  @IsString()
  title: string;
}

export class FeedDTO {
  @IsString()
  imageUrl: string;

  @IsString()
  postText: string;

  @IsString()
  title: string;

  @IsString()
  name: string;

  @IsString()
  surname: string

  @IsNumber()
  profileId: number;

  comment : CommentDTO[]

  @IsNumber()
  page : number
}


export class GetRelationalPostDTO {
  @IsNumber()
  id : number;

  @IsString()
  image?: string;

  @IsString()
  postText: string;

  @IsString()
  title: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsNumber()
  profileId: number;

  comment : CommentDTO[]
}


export class allRelationalPostDTO{
  posts : GetRelationalPostDTO[]
  @IsNumber()
  page : number
  @IsNumber()
  countAllData: number
}

export class allFeedDTO{
  posts :  FeedDTO[]
  @IsNumber()
  page : number
  @IsNumber()
  countAllData: number
}
