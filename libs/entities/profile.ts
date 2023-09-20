import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  authUserId: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  surname: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Post, (post) => post.profile, { cascade: true })
  post: Post[];
}
