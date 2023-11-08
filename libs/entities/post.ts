import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile';
import { Comment } from './comment';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length:512, nullable: true })
  imageUrl?: string;

  @Column({ type: 'varchar', length:600, })
  postText: string;

  @Column({ type: 'varchar',length:512, })
  title: string;

  @Column({ type: 'number' })
  profileId: number;

  @ManyToOne(() => Profile, (profile) => profile.post)
  profile: Profile;

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comment: Comment[];

}
