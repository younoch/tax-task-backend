import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';   // using your alias
import { CreateTaxDto } from '../dto/create-tax.dto';


@Injectable()
export class TaxTaskService {
  constructor(private readonly prisma: PrismaService) {}

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

    return this.prisma.taxTask.create({
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
    return this.prisma.taxTask.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ✅ 4. Get One
  async findOne(id: string, userId: string) {
    return this.prisma.taxTask.findFirst({
      where: { id, userId },
    });
  }

  // ✅ 5. Update
  async update(id: string, dto: CreateTaxDto, userId: string) {
    const result = this.calculateTax(dto);

    return this.prisma.taxTask.update({
      where: { id, userId },
      data: {
        ...dto,
        ...result,
      },
    });
  }

  // ✅ 6. Delete
  async remove(id: string, userId: string) {
    return this.prisma.taxTask.delete({
      where: { id, userId },
    });
  }
}
