import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { Profile } from './profile';
import { Post } from './post';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar',length:512 })
  @IsString()
  text: string;

  @Column({ type: 'number' })
  @IsNumber()
  profileId: number;

  @Column({ type: 'number' })
  @IsNumber()
  postId: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;


  @ManyToOne(() => Profile, (profile) => profile.comment)
  profile: Profile;

  @ManyToOne(() => Post, (post) => post.comment, {onDelete: 'CASCADE'} )
  post: Post;
}
