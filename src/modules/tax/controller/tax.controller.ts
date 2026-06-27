import { Controller, Get, Post, Body } from '@nestjs/common';
import { TaxService } from '../service/tax.service';
import { CalculateTaxDto } from '../dto/tax.dto';


@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Get()
  getTaxMessage(): string {
    return this.taxService.getTaxMessage();
  }

  @Post('calculate')
  calculateTax(@Body() body: CalculateTaxDto) {
    return this.taxService.calculateTax(body.taxRate, body.income);
  }
}