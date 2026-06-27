import { Injectable } from '@nestjs/common';
import { CalculateTaxDto } from '../dto/tax.dto';


@Injectable()
export class TaxService {
    getTaxMessage(): string {
        return 'This is a tax message from the TaxService.';
    }

    calculateTax(dto: CalculateTaxDto){
        const { income, taxRate } = dto;
        const tax = (income * taxRate) / 100;
        return {
                income,
                tax,
                total: income + tax,
                totalIncomeAfterTax: income - tax
        };
    }
}
