import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class TaxTaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.TaxTaskUncheckedCreateInput) {
    return this.prisma.taxTask.create({ data });
  }

  async findAll(userId: string, includeDeleted: boolean = false, page: number = 1, pageSize: number = 10) {
    return this.prisma.taxTask.findMany({
      where: {
        userId,
        deletedAt: includeDeleted ? undefined : null,
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
  }

  async findById(id: string, userId: string) {
    return this.prisma.taxTask.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });
  }

  async update(id: string, userId: string, data: Prisma.TaxTaskUncheckedUpdateInput) {
    return this.prisma.taxTask.update({
      where: { id, userId },
      data,
    });
  }

  async softDelete(id: string, userId: string) {
    return this.prisma.taxTask.update({
      where: { id, userId },
      data: {
        deletedAt: new Date(),
      },
    });
  }
  async restore(id: string, userId: string) {
    return this.prisma.taxTask.update({
      where: { id, userId },
      data: {
        deletedAt: null,
      },
    });
  }
}
