import { Module } from '@nestjs/common';
import { TaxController } from './controller/tax.controller';
import { TaxService } from './service/tax.service';

@Module({
  controllers: [TaxController],
  providers: [TaxService]
})
export class TaxModule {}
