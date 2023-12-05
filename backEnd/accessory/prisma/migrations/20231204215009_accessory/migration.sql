-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'OWNER');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('RINGS', 'EARINGS', 'HAIRCLIPS', 'HAIRBANDS', 'BRACLETS', 'NECKLACES', 'BROOCHES');

-- CreateEnum
CREATE TYPE "SENDER" AS ENUM ('owner', 'customer');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Available', 'SoldOut');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullname" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "profilePic" TEXT,
    "hasNotification" BOOLEAN NOT NULL DEFAULT false,
    "hasNewMessage" BOOLEAN NOT NULL DEFAULT false,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verifyToken" TEXT,
    "otp" INTEGER,
    "resetCode" INTEGER,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jewelry" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" "Category"[],
    "main_image" TEXT NOT NULL,
    "extra_images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" "Status" NOT NULL DEFAULT 'Available',

    CONSTRAINT "Jewelry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jewlery_name" TEXT NOT NULL,
    "jewelryId" INTEGER,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,
    "sender" "SENDER" NOT NULL,
    "customerId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "jewelryId" INTEGER,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Jewelry_name_key" ON "Jewelry"("name");

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_jewelryId_fkey" FOREIGN KEY ("jewelryId") REFERENCES "Jewelry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_jewelryId_fkey" FOREIGN KEY ("jewelryId") REFERENCES "Jewelry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
