import { Injectable } from '@nestjs/common';
import { PostRepository } from '../../../libs/repositories/post.repository';
import {
  allFeedDTO,
  allRelationalPostDTO,
  PostDTO,
} from '../../../libs/dto/post.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { InternalServerErrorException } from '../../../libs/exceptions/internal-server';
import { message } from '../../../libs/utils/messages';
import { CommentDTO } from '../../../libs/dto/comment.dto';
import { Comment } from '../../../libs/entities/comment';
import {ProfileRepository} from "../../../libs/repositories/profile.repository";
import {NotFoundException} from "../../../libs/exceptions/not-found.exception";

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository, private readonly profileRepository : ProfileRepository) {}

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
      authUserId: string ,
      page: number,
  ): Promise<allFeedDTO> {
    try {

      const posts = await this.postRepository.findAllPosts(page);
      if(authUserId) {
        const filteredPosts = posts.filter(post => post.profile.authUserId !== authUserId);
        const feed = filteredPosts.map((post) => ({
          id: post.id,
          imageUrl: post.imageUrl,
          postText: post.postText,
          title: post.title,
          name: post.profile.name,
          surname: post.profile.surname,
          profileId: post.profileId,
          comment: this.getComment(post.comment),
          page: page
        }));
        const allCountData = await this.postRepository.countPosts()
        return {
          posts: feed,
          page: page,
          countAllData: allCountData
        }
      }
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
      console.log(error, 7854)
      throw new InternalServerErrorException(message.getAllPosts);
    }
  }

  async deletePost(id: number, authUserId :string): Promise<DeleteResult> {
    try {
      const profile = await this.profileRepository.findOneProfile(authUserId)

      const post = await this.postRepository.findONePostById(id)
      if (profile.id === post.profileId) {
        return await this.postRepository.deletePostById(id,authUserId);
      }
      else {
        throw new  NotFoundException("not found!")
      }
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(message.deletePost);
    }
  }


  async updatePost(id: number, postDTO: PostDTO, authUserId): Promise<UpdateResult> {
    try {
      const profile = await this.profileRepository.findOneProfile(authUserId)

      const post = await this.postRepository.findONePostById(id)
      if (profile.id === post.profileId) {
        return await this.postRepository.updatePostById(id, postDTO);
      }
      else {
        throw new  NotFoundException("not found!")
      }
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
