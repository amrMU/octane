import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './DTO/create-book.dto';
import { UpdateBookDto } from './DTO/update-book.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
  ) {}

  create(dto: CreateBookDto) {
    const book = this.bookRepo.create(dto);
    return this.bookRepo.save(book);
  }

  findAll() {
    return this.bookRepo.find();
  }

  async update(id: number, dto: UpdateBookDto) {
  const book = await this.bookRepo.findOneBy({ id });
  if (!book) {
    throw new NotFoundException('Book not found');
  }

  Object.assign(book, dto);
  return this.bookRepo.save(book);
}

async delete(id: number) {
  const book = await this.bookRepo.findOneBy({ id });
 if (!book) {
    throw new NotFoundException('Book not found');
  }

  await this.bookRepo.remove(book);
  return { message: 'Book deleted successfully' };
}

}
