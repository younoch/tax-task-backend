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
  @ApiOperation({ summary: 'Get all tax tasks' })
  @ApiResponse({ status: 200, description: 'List of tax tasks' })
  findAll(@CurrentUser() user: JwtUser) {
    return this.taxTaskService.findAll(user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a tax task by ID' })
  @ApiResponse({ status: 200, description: 'Tax task details' })
  findOne(@CurrentUser() user: JwtUser, @Body('id') id: string) {
    return this.taxTaskService.findOne(id, user.userId);
  }

  @Post(':id')
  @ApiOperation({ summary: 'Update a tax task by ID' })
  @ApiBody({ type: CreateTaxDto })
  @ApiResponse({ status: 200, description: 'Tax task updated successfully' })
  update(@CurrentUser() user: JwtUser, @Body('id') id: string, @Body() body: CreateTaxDto) {
    return this.taxTaskService.update(id, body, user.userId);
  }

  @Post(':id/soft-delete')
  @ApiOperation({ summary: 'Delete a tax task by ID' })
  @ApiResponse({ status: 200, description: 'Tax task deleted successfully' })
  softDelete(@CurrentUser() user: JwtUser, @Body('id') id: string) {
    return this.taxTaskService.softDelete(id, user.userId);
  }

  @Post(':id/restore')
  @ApiOperation({ summary: 'Restore a tax task by ID' })
  @ApiResponse({ status: 200, description: 'Tax task restored successfully' })
  restore(@CurrentUser() user: JwtUser, @Body('id') id: string) {
    return this.taxTaskService.restore(id, user.userId);
  }
}
