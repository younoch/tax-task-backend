import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Logger } from 'nestjs-pino/Logger';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class CleanupService {
  constructor(
    private prisma: PrismaService,
    private logger: Logger,
  ) {}

  @Cron(CronExpression.EVERY_DAY)
  async handleCleanup() {
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    await this.prisma.taxTask.deleteMany({
      where: {
        deletedAt: {
          not: null,
          lt: sixtyDaysAgo,
        },
      },
    });

    this.logger.log(
      { action: 'cleanup', status: 'success' },
      'Old soft-deleted tasks removed from the database',
    );
  }
}
