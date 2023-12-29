/*
  Warnings:

  - Added the required column `userId` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CartStatus" AS ENUM ('EMPTY', 'PENDING', 'CANCELLED', 'PAID');

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "cartStatus" "CartStatus" NOT NULL DEFAULT 'EMPTY',
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
