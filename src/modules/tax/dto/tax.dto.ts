import { IsNumber, Max, Min } from 'class-validator';

export class CalculateTaxDto {
@IsNumber()
@Min(0)
income!: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  taxRate!: number;
}