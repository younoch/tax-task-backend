import { Controller, Post, Body, Get } from '@nestjs/common';
import { TaxTaskService } from '../service/taxTask.service';
import { CreateTaxDto } from '../dto/create-tax.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { JwtUser } from '@/common/types/jwt-user.type';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('tax')
export class TaxTaskController {
  constructor(private readonly taxTaskService: TaxTaskService) {}

  @Post('calculate')
  @ApiOperation({ summary: 'Calculate tax' })
  @ApiBody({ type: CreateTaxDto })
  @ApiResponse({ status: 200, description: 'Tax calculated successfully' })
  calculateTax(@Body() body: CreateTaxDto) {
    return this.taxTaskService.calculateTax(body);
  }

  @Post()
  @ApiOperation({ summary: 'Create tax task' })
  @ApiBody({ type: CreateTaxDto })
  @ApiResponse({ status: 201, description: 'Tax task created successfully' })
  createTax(@Body() body: CreateTaxDto, @CurrentUser() user: JwtUser) {
    return this.taxTaskService.create(body, user.userId);
  }

  @Get()
  findAll(@CurrentUser() user: JwtUser) {
    return this.taxTaskService.findAll(user.userId);
  }
}
