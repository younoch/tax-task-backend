import { Test, TestingModule } from '@nestjs/testing';
import { TaxTaskController } from './taxTask.controller';

describe('TaxTaskController', () => {
  let controller: TaxTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxTaskController],
    }).compile();

    controller = module.get<TaxTaskController>(TaxTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
