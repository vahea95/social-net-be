import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from './profile';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'varchar' })
  postText: string;

  @Column({ type: 'varchar' })
  title: string;

  @ManyToOne(() => Profile, (profile) => profile.post) profile: Profile;
}
