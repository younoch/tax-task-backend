import { Test, TestingModule } from '@nestjs/testing';
import { TaxTaskController } from './taxTask.controller';
import { TaxTaskService } from '../service/taxTask.service';

describe('TaxTaskController', () => {
  let controller: TaxTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxTaskController],
      providers: [
        {
          provide: TaxTaskService,
          useValue: {
            calculateTax: jest.fn(),
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            softDelete: jest.fn(),
            restore: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TaxTaskController>(TaxTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});