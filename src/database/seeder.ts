import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { BooksService } from '../books/books.service';
import { ReadingIntervalsService } from '../reading-intervals/reading-intervals.service';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const usersService = app.get(UsersService);
  const booksService = app.get(BooksService);
  const riService = app.get(ReadingIntervalsService);

  // Create users
  const password = await bcrypt.hash('password', 10);

  const admin = await usersService.createUser({
    name: 'Admin User',
    email: 'admin@test.com',
    password,
    role: 'admin',
  });

  const user = await usersService.createUser({
    name: 'Normal User',
    email: 'user@test.com',
    password,
    role: 'user',
  });

  // Create books
  const book1 = await booksService.create({
    title: 'Clean Code',
    author: 'Robert C. Martin',
    description: 'A book about writing cleaner code',
  });

  const book2 = await booksService.create({
    title: 'Atomic Habits',
    author: 'James Clear',
    description: 'How tiny changes lead to remarkable results',
  });

  // Create reading intervals
  await riService.create({
    startDate: new Date('2025-07-15'),
    endDate: new Date('2025-07-20'),
    bookId: book1.id,
    userId: user.id,
  });

  await riService.create({
    startDate: new Date('2025-07-21'),
    endDate: new Date('2025-07-25'),
    bookId: book2.id,
    userId: user.id,
  });

  console.log('✅ Seed data created');
  await app.close();
}

bootstrap();
