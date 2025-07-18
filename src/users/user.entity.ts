import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ReadingInterval } from '../reading-intervals/reading-interval.entity';
import { Exclude,Expose } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  @Expose()
  name: string;

  @Column({ unique: true })
  @Expose()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: 'user' })
  @Expose()
  role: 'user' | 'admin';

  @OneToMany(() => ReadingInterval, (ri) => ri.user)
  readingIntervals: ReadingInterval[];
}
