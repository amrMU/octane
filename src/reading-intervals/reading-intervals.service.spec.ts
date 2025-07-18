import { Test, TestingModule } from '@nestjs/testing';
import { ReadingIntervalsService } from './reading-intervals.service';

describe('ReadingIntervalsService', () => {
  let service: ReadingIntervalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReadingIntervalsService],
    }).compile();

    service = module.get<ReadingIntervalsService>(ReadingIntervalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
