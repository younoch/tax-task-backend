import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class TaxTaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.taxTask.create({ data });
  }

  async findAll(userId: string) {
    return this.prisma.taxTask.findMany({
      where: {
        userId,
        deletedAt: null,
      },
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

  async update(id: string, data: any) {
    return this.prisma.taxTask.update({
      where: { id },
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