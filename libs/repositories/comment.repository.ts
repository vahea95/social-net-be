import { Injectable } from '@nestjs/common';
import { DataSource, InsertResult, Repository } from 'typeorm';
import { Comment } from '../entities/comment';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(public readonly dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  override insert(
      entity: QueryDeepPartialEntity<Comment> | QueryDeepPartialEntity<Comment>[],
  ): Promise<InsertResult> {
    return super.insert(entity);
  }

  findPostComments(postId: number): Promise<Comment[]> {
    return this.find({
      where: { postId },
      relations: { post: true, profile: true },
    });
  }
}
