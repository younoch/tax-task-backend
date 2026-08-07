import { Test, TestingModule } from '@nestjs/testing';
import { TaxTaskService } from './taxTask.service';
import { PrismaService } from '@/common/prisma/prisma.service';
import { TaxTaskRepository } from '../repository/taxTask.repository';

describe('TaxTaskService', () => {
  let service: TaxTaskService;

  const mockPrismaService = {};

  const mockTaxTaskRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
    restore: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaxTaskService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: TaxTaskRepository, useValue: mockTaxTaskRepository },
      ],
    }).compile();

    service = module.get<TaxTaskService>(TaxTaskService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call repository with correct arguments', async () => {
    const fakeResult = { data: [], total: 0 };
    mockTaxTaskRepository.findAll.mockResolvedValue(fakeResult);

    const userId = 'user123';
    const pagination = { page: 1, pageSize: 10, includeDeleted: false, skip: 0 };

    const result = await service.findAll(userId, pagination);

    expect(mockTaxTaskRepository.findAll).toHaveBeenCalledWith(
      userId,
      pagination,
    );

    expect(result).toEqual(fakeResult);
  });
});
