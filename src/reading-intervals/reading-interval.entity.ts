import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Book } from '../books/book.entity';
import { Expose, Type } from 'class-transformer';

@Unique(['user', 'book', 'startDate', 'endDate'])
@Entity()
export class ReadingInterval {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  @Expose()
  startDate: Date;

  @Column()
  @Expose()
  endDate: Date;

  @ManyToOne(() => User, (user) => user.readingIntervals)
  @Type(() => User)
  @Expose()
  user: User;

  @ManyToOne(() => Book, (book) => book.readingIntervals)
  @Type(() => Book)
  @Expose()
  book: Book;
}
