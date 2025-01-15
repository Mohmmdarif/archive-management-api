/*
  Warnings:

  - Added the required column `konfirmasi_password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "konfirmasi_password" TEXT NOT NULL,
ALTER COLUMN "nip" SET DATA TYPE TEXT;
