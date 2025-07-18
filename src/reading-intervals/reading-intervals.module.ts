import { Module } from '@nestjs/common';
import { ReadingIntervalsController } from './reading-intervals.controller';
import { ReadingIntervalsService } from './reading-intervals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadingInterval } from './reading-interval.entity';
import { Book } from 'src/books/book.entity';
import { User } from 'src/users/user.entity';

@Module({
  controllers: [ReadingIntervalsController],
  providers: [ReadingIntervalsService]
})

@Module({
  imports: [TypeOrmModule.forFeature([ReadingInterval, Book, User])],
  providers: [ReadingIntervalsService],
  controllers: [ReadingIntervalsController],
})
export class ReadingIntervalsModule {}
