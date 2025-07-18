import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,OneToMany } from 'typeorm';
import { ReadingInterval } from '../reading-intervals/reading-interval.entity';
import { Expose } from 'class-transformer';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  @Expose()
  title: string;

  @Column()
  @Expose()
  author: string;

  @Column({ nullable: true })
  @Expose()
  description: string;

  @CreateDateColumn()
  @Expose()
  createdAt: Date;

  @UpdateDateColumn()
  @Expose()
  updatedAt: Date;

  @OneToMany(() => ReadingInterval, (ri) => ri.book)
  @Expose()
  readingIntervals: ReadingInterval[];
}
