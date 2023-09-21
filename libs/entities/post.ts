import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from './profile';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  image?: string;

  @Column({ type: 'varchar' })
  postText: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'number' })
  profileId: number;

  @ManyToOne(() => Profile, (profile) => profile.post)
  profile: Profile;
}
