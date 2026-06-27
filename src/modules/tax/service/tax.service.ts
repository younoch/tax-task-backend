import { Injectable } from '@nestjs/common';

@Injectable()
export class TaxService {
    getTaxMessage(): string {
        return 'This is a tax message from the TaxService.';
    }

    calculateTax(taxRate: number, income: number){
        const tax = income * taxRate / 100;
        return {
            success: true,
            data: {
                income,
                tax,
                total: income + tax,
                totalIncomeAfterTax: income - tax
            }
        };
    }
}
