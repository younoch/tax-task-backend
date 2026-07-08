/*
  Warnings:

  - You are about to drop the `Tax` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'PROCESSING', 'DONE', 'FAILED');

-- DropForeignKey
ALTER TABLE "Tax" DROP CONSTRAINT "Tax_userId_fkey";

-- DropTable
DROP TABLE "Tax";

-- CreateTable
CREATE TABLE "TaxTask" (
    "id" TEXT NOT NULL,
    "income" DOUBLE PRECISION NOT NULL,
    "expenses" DOUBLE PRECISION NOT NULL,
    "taxRate" DOUBLE PRECISION NOT NULL,
    "result" DOUBLE PRECISION,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaxTask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaxTask" ADD CONSTRAINT "TaxTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
