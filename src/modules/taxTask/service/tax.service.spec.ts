import { Test, TestingModule } from '@nestjs/testing';
import { TaxTaskService } from './taxTask.service';

describe('TaxTaskService', () => {
  let service: TaxTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaxTaskService],
    }).compile();

    service = module.get<TaxTaskService>(TaxTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
