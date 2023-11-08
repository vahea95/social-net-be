import { Injectable } from '@nestjs/common';
import { PostRepository } from '../../../libs/repositories/post.repository';
import {
  allFeedDTO,
  allRelationalPostDTO,
  FeedDTO,
  GetRelationalPostDTO,
  PostDTO,
} from '../../../libs/dto/post.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { InternalServerErrorException } from '../../../libs/exceptions/internal-server';
import { message } from '../../../libs/utils/messages';
import { CommentDTO } from '../../../libs/dto/comment.dto';
import { Comment } from '../../../libs/entities/comment';
import {CommentRepository} from "../../../libs/repositories/comment.repository";

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository, private readonly commentRepository: CommentRepository) {}

  async createPost(postDTO: PostDTO): Promise<InsertResult> {
    try {
      return await this.postRepository.insert({
        ...postDTO,
      });
    } catch (error) {
      throw new InternalServerErrorException(message.createPost);
    }
  }

  async getPosts(
      authUserId: string,
      page: number,
  ): Promise<allFeedDTO> {
    try {
      const posts = await this.postRepository.findAllPosts(page);
      const filteredPosts = posts.filter(post => post.profile.authUserId !== authUserId);
      const feed = filteredPosts.map((post) => ({
        id: post.id,
        imageUrl: post.imageUrl,
        postText: post.postText,
        title: post.title,
        name: post.profile.name,
        surname : post.profile.surname,
        profileId : post.profileId,
        comment: this.getComment(post.comment),
        page:page
      }));
      const allCountData = await this.postRepository.countPosts()
      return {
        posts : feed,
        page : page,
        countAllData : allCountData
      }
    } catch (error) {
      console.log(error, 7854)
      throw new InternalServerErrorException(message.getAllPosts);
    }
  }

  async getPostsForGuests(
      page: number,
  ): Promise<allFeedDTO> {
    try {
      const posts = await this.postRepository.findAllPosts(page);
      const ArrPosts = posts.map((post) => ({
        id: post.id,
        imageUrl: post.imageUrl,
        postText: post.postText,
        title: post.title,
        name: post.profile.name,
        surname : post.profile.surname,
        profileId : post.profileId,
        comment: this.getComment(post.comment),
        page : page
      }));
      const allCountData = await this.postRepository.countPosts()

      return {
        posts : ArrPosts,
        page : page,
        countAllData : allCountData
      }
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(message.getAllPosts);
    }
  }

  async deletePost(id: number): Promise<DeleteResult> {
    try {
      return await this.postRepository.deletePostById(id);
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(message.deletePost);
    }
  }

  async updatePost(id: number, postDTO: PostDTO): Promise<UpdateResult> {
    try {
      return await this.postRepository.updatePostById(id, postDTO);
    } catch (error) {
      throw new InternalServerErrorException(message.updatePost);
    }
  }

  async getRelationalPosts( profileId: number, page : number, ): Promise<allRelationalPostDTO> {
    try {
      const userPosts =  await this.postRepository.findPostsRelationProfile(profileId, page);

      const allDataCount = await this.postRepository.countRelationalProfile(profileId)



      const posts = userPosts.map((post) => ({
        id: post.id,
        imageUrl: post.imageUrl,
        postText: post.postText,
        title: post.title,
        name: post.profile.name,
        profileId : post.profileId,
        surname: post.profile.surname,
        comment: this.getComment(post.comment),
      }));

      return {
        posts : posts,
        page : page,
        countAllData : allDataCount
      }
    } catch (error) {
      throw new InternalServerErrorException(message.getUserPosts);
    }
  }

  private getComment(comments: Comment[]): CommentDTO[] {

    return comments.map((comment) => ({
      id: comment.id,
      text: comment.text,
      profileId: comment.profileId,
      postId: comment.postId,
      created_at: comment.created_at,
      userName: comment?.profile?.name,
      userSurname: comment?.profile?.surname,
    }));
  }
}
