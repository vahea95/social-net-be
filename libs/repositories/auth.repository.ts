import { Injectable } from '@nestjs/common';
import { DataSource, InsertResult, Repository } from 'typeorm';
import { Profile } from '../entities/profile';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class ProfileRepository extends Repository<Profile> {
  constructor(public readonly dataSource: DataSource) {
    super(Profile, dataSource.createEntityManager());
  }

  override insert(
    entity: QueryDeepPartialEntity<Profile> | QueryDeepPartialEntity<Profile>[],
  ): Promise<InsertResult> {
    return super.insert(entity);
  }

  findOneWithPostRelationById(id: number): Promise<Profile> {
    return this.findOne({ where: { id }, relations: { post: true } });
  }
}
