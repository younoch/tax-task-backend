import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/common/prisma/prisma.service';
import { PaginationQueryDto } from '@/common/dto/pagination-query.dto';
import { paginate } from '@/common/helpers/paginate.helper';
@Injectable()
export class TaxTaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.TaxTaskUncheckedCreateInput) {
    return this.prisma.taxTask.create({ data });
  }

  async findAll(
    userId: string,
    query: PaginationQueryDto,
  ) {
    const where = {
      userId,
      deletedAt: query.includeDeleted ? undefined : null,
    };

    return paginate(
      () =>
        this.prisma.taxTask.findMany({
          where,
          skip: query.skip,
          take: query.pageSize,
        }),
      () => this.prisma.taxTask.count({ where }),
      query.page,
      query.pageSize,
    );
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

  async update(
    id: string,
    userId: string,
    data: Prisma.TaxTaskUncheckedUpdateInput,
  ) {
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
