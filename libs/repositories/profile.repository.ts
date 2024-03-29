import { Injectable } from '@nestjs/common';
import {DataSource, InsertResult, Repository, UpdateResult} from 'typeorm';
import { Profile } from '../entities/profile';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import {getProfileDTO, ProfileDTO} from "../dto/profile.dto";

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

  findOneProfile(authUserId: string): Promise<Profile> {
    return this.findOne({ where: { authUserId } });
  }
  updateAvatar(authUserId : string, profileDto : ProfileDTO) : Promise<UpdateResult> {
    return this.update(
        {authUserId},
    {
      avatarUrl : profileDto.avatarUrl
    }

    )
  }
}
