import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service'; // using your alias
import { CreateTaxDto } from '../dto/create-tax.dto';
import { UpdateTaxDto } from '../dto/update-tax.dto';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { TaxTaskRepository } from '../repository/taxTask.repository';

@Injectable()
export class TaxTaskService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly taxTaskRepository: TaxTaskRepository,
  ) {}

  // ✅ 1. Tax Calculation (Pure Logic)
  calculateTax(dto: CreateTaxDto) {
    const { income, taxRate, expenses } = dto;

    const taxableIncome = income - expenses;
    const tax = (taxableIncome * taxRate) / 100;

    return {
      taxableIncome,
      tax,
      totalIncomeAfterTax: income - tax,
    };
  }

  async create(dto: CreateTaxDto, userId: string) {
    const result = this.calculateTax(dto);

    return this.taxTaskRepository.create({
      ...dto,
      ...result,
      status: 'PENDING',
      userId,
    });
  }

  // ✅ 3. Get All
  async findAll(
    userId: string,
    pagination: PaginationQueryDto,
  ) {
    return this.taxTaskRepository.findAll(
      userId,
      pagination
    );
  }

  // ✅ 4. Get One
  async findOne(id: string, userId: string) {
    return this.taxTaskRepository.findById(id, userId);
  }

  // ✅ 5. Update
  async update(id: string, dto: UpdateTaxDto, userId: string) {
    const existing = await this.taxTaskRepository.findById(id, userId);
    if (!existing) {
      throw new NotFoundException('Tax task not found');
    }

    const merged = {
      income: dto.income ?? existing.income,
      taxRate: dto.taxRate ?? existing.taxRate,
      expenses: dto.expenses ?? existing.expenses,
    };

    const result = this.calculateTax(merged);

    return this.taxTaskRepository.update(id, userId, {
      ...merged,
      ...result,
    });
  }

  // ✅ 6. Delete
  async softDelete(id: string, userId: string) {
    return this.taxTaskRepository.softDelete(id, userId);
  }

  // ✅ 7. Restore
  async restore(id: string, userId: string) {
    const existing = await this.taxTaskRepository.findById(id, userId);
    if (!existing) {
      throw new NotFoundException('Tax task not found');
    }
    if (!existing.deletedAt) {
      throw new BadRequestException('Tax task is already active');
    }
    return this.taxTaskRepository.restore(id, userId);
  }
}
