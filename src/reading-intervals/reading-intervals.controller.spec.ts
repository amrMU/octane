import { Test, TestingModule } from '@nestjs/testing';
import { ReadingIntervalsController } from './reading-intervals.controller';

describe('ReadingIntervalsController', () => {
  let controller: ReadingIntervalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReadingIntervalsController],
    }).compile();

    controller = module.get<ReadingIntervalsController>(ReadingIntervalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
