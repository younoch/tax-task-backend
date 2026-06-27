import { Controller, Get, Post, Body } from '@nestjs/common';
import { TaxService } from '../service/tax.service';
import { CalculateTaxDto } from '../dto/tax.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Get()
  getTaxMessage(): string {
    return this.taxService.getTaxMessage();
  }

  @Post('calculate')
  @ApiOperation({ summary: 'Calculate tax' })
@ApiBody({ type: CalculateTaxDto })
@ApiResponse({ status: 200, description: 'Tax calculated successfully' })
  calculateTax(@Body() body: CalculateTaxDto) {
    return this.taxService.calculateTax(body);
  }
}