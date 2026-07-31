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
    const includeDeleted = false;
    const page = 1;
    const pageSize = 10;

    const result = await service.findAll(userId, includeDeleted, page, pageSize);

    expect(mockTaxTaskRepository.findAll).toHaveBeenCalledWith(
      userId,
      includeDeleted,
      page,
      pageSize,
    );

    expect(result).toEqual(fakeResult);
  });
});