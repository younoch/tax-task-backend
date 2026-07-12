import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';   // using your alias
import { CreateTaxDto } from '../dto/create-tax.dto';
import { TaxTaskRepository } from '../repository/taxTask.repository';

@Injectable()
export class TaxTaskService {
  constructor(private readonly prisma: PrismaService, private readonly taxTaskRepository: TaxTaskRepository) {}

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

  // ✅ 2. Create + Save
  async create(dto: CreateTaxDto, userId: string) {
    const result = this.calculateTax(dto);

    return this.taxTaskRepository.create({
      data: {
        ...dto,
        ...result,
        status: 'PENDING',
        userId,
      },
    });
  }

  // ✅ 3. Get All
  async findAll(userId: string) {
    return this.taxTaskRepository.findAll(userId);
  }

  // ✅ 4. Get One
  async findOne(id: string, userId: string) {
    return this.taxTaskRepository.findById(id, userId);
  }

  // ✅ 5. Update
  async update(id: string, dto: CreateTaxDto, userId: string) {
    const result = this.calculateTax(dto);

    return this.taxTaskRepository.update(id, {
      ...dto,
      ...result,
    });
  }

  // ✅ 6. Delete
  async softDelete(id: string, userId: string) {
    return this.taxTaskRepository.softDelete(id, userId);
  }

  // ✅ 7. Restore
  async restore(id: string, userId: string) {
    return this.taxTaskRepository.restore(id, userId);
  }

  
}
