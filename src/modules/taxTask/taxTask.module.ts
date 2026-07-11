import { Module } from '@nestjs/common';
import { TaxTaskController } from './controller/taxTask.controller';
import { TaxTaskService } from './service/taxTask.service';
import { PrismaModule } from '@/common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TaxTaskController],
  providers: [TaxTaskService],
})
export class TaxTaskModule {}
