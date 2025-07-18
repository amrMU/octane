import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { ReadingInterval } from './reading-interval.entity';
import { Book } from '../books/book.entity';
import { User } from '../users/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ReadingIntervalsService {
  constructor(
    @InjectRepository(ReadingInterval)
    private riRepo: Repository<ReadingInterval>,

    @InjectRepository(Book)
    private bookRepo: Repository<Book>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(data: {
    startDate: Date;
    endDate: Date;
    bookId: number;
    userId: number;
  }) {
    const book = await this.bookRepo.findOneBy({ id: data.bookId });
    if (!book) {
      throw new BadRequestException('Book not found.');
    }

    const user = await this.userRepo.findOneBy({ id: data.userId });
    if (!user) {
      throw new BadRequestException('User not found.');
    }

    const normalizedStart = new Date(data.startDate);
    normalizedStart.setHours(0, 0, 0, 0);
    const normalizedEnd = new Date(data.endDate);
    normalizedEnd.setHours(0, 0, 0, 0);

    const existing = await this.riRepo
      .createQueryBuilder('interval')
      .leftJoin('interval.user', 'user')
      .leftJoin('interval.book', 'book')
      .where('user.id = :userId', { userId: data.userId })
      .andWhere('book.id = :bookId', { bookId: data.bookId })
      .andWhere('DATE(interval.startDate) = DATE(:startDate)', {
        startDate: normalizedStart.toISOString().split('T')[0],
      })
      .andWhere('DATE(interval.endDate) = DATE(:endDate)', {
        endDate: normalizedEnd.toISOString().split('T')[0],
      })
      .getOne();

    if (existing) {
      throw new BadRequestException({
        message: 'You already submitted this interval for this book.',
        bookId: data.bookId,
        userId: data.userId,
        startDate: data.startDate,
        endDate: data.endDate,
      });
    }

    try {
      const interval = this.riRepo.create({
        startDate: data.startDate,
        endDate: data.endDate,
        book,
        user,
      });

      const saved = await this.riRepo.save(interval);
      const full = await this.riRepo.findOne({
        where: { id: saved.id },
        relations: ['user', 'book'],
      });

      return plainToInstance(ReadingInterval, full, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error as any).driverError?.code === '23505'
      ) {
        throw new BadRequestException('Duplicate entry detected.');
      }
      throw error;
    }
  }

   async findForUser(userId: number) {
  const intervals = await this.riRepo.find({
  where: {
    user: { id: userId },
  },
  relations: ['book', 'user'],
});

  return plainToInstance(ReadingInterval, intervals, {
    excludeExtraneousValues: true,
  });
}




    async findAll() {
    const intervals = await this.riRepo.find({
        relations: ['book', 'user'],
    });

    return plainToInstance(ReadingInterval, intervals, {
        excludeExtraneousValues: true,
    });
    }
}
