import { Injectable } from '@nestjs/common';
import {
  DataSource,
  DeleteResult,
  InsertResult,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Post } from '../entities/post';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { PostDTO } from '../dto/post.dto';
import {ProfileRepository} from "./profile.repository";

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(public readonly dataSource: DataSource, private readonly profileRepository: ProfileRepository) {
    super(Post, dataSource.createEntityManager());
  }

  override insert(
      entity: QueryDeepPartialEntity<Post> | QueryDeepPartialEntity<Post>[],
  ): Promise<InsertResult> {
    return super.insert(entity);
  }

  findPostsRelationProfile(profileId: number, page:number): Promise<Post[]> {
    const pageSize = 3
    return this.find({where: {profileId}, relations: {profile: true , comment : {profile : true}},skip: (page - 1) * pageSize,
      take: pageSize,});
  }



  countRelationalProfile(profileId: number): Promise<number> {
    return this.count({ where: { profileId } });
  }

  countPosts(): Promise<number> {
    return this.count();
  }

  findAllPosts(page: number): Promise<Post[]> {
    const pageSize = 6
    const skipFormula = (page - 1) * pageSize;
    Number(skipFormula)

    return this.find({
      relations: { profile: true, comment: { profile: true } },
      skip: skipFormula,
      take: pageSize,
    });
  }

  async findONePostById (id : number): Promise<Post> {
    return this.findOne({ where: { id } });
  }

  async deletePostById(id: number, authUserId : string): Promise<DeleteResult> {
    try {
      const profile = await this.profileRepository.findOneProfile(authUserId)
      const post = await this.findOne({where: {id}})
      if (profile.id === post.profileId) {
        return this.delete(id);
      }
    }
    catch {
      throw new Error()
    }
  }
  updatePostById(id: number, postDTO: PostDTO): Promise<UpdateResult> {
    return this.update(
        { id },
        {
          imageUrl: postDTO.imageUrl,
          postText: postDTO.postText,
          title: postDTO.title,
        },
    );
  }
}
