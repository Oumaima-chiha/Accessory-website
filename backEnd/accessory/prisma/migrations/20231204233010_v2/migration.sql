/*
  Warnings:

  - You are about to drop the `payment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `price` to the `Jewelry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_jewelryId_fkey";

-- AlterTable
ALTER TABLE "Jewelry" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "payment";

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "jewelryId" INTEGER,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_jewelryId_fkey" FOREIGN KEY ("jewelryId") REFERENCES "Jewelry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
