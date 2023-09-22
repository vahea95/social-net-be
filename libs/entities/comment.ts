import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { Profile } from './profile';
import { Post } from './post';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  @IsString()
  text: string;

  @Column({ type: 'number' })
  @IsNumber()
  profileId: number;

  @Column({ type: 'number' })
  @IsNumber()
  postId: number;

  @ManyToOne(() => Profile, (profile) => profile.comment)
  profile: Profile;

  @ManyToOne(() => Post, (post) => post.comment)
  post: Post;
}
