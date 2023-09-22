import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post';
import { Comment } from './comment';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  authUserId: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  surname: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Post, (post) => post.profile, { cascade: true })
  post: Post[];

  @OneToMany(() => Comment, (comment) => comment.profile, { cascade: true })
  comment: Comment[];
}
