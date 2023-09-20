import { Injectable } from '@nestjs/common';
import { DataSource, InsertResult, Repository } from 'typeorm';
import { Post } from '../entities/post';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(public readonly dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }

  override insert(
    entity: QueryDeepPartialEntity<Post> | QueryDeepPartialEntity<Post>[],
  ): Promise<InsertResult> {
    return super.insert(entity);
  }
}
