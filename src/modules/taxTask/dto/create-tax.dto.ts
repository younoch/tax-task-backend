import { IsNumber, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaxDto {
  @ApiProperty({ example: 1000 })
  @IsNumber()
  @Min(0)
  income!: number;

  @ApiProperty({ example: 200 })
  @IsNumber()
  @Min(0)
  expenses!: number;

  @ApiProperty({ example: 20 })
  @IsNumber()
  @Min(0)
  @Max(100)
  taxRate!: number;
}