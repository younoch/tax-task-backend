/*
  Warnings:

  - Added the required column `totalIncomeAfterTax` to the `TaxTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaxTask" ADD COLUMN     "totalIncomeAfterTax" DOUBLE PRECISION NOT NULL;
