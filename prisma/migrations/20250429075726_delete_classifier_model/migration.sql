/*
  Warnings:

  - You are about to drop the column `id_classifier` on the `Surat` table. All the data in the column will be lost.
  - You are about to drop the `Classifier` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Surat" DROP CONSTRAINT "Surat_id_classifier_fkey";

-- AlterTable
ALTER TABLE "Surat" DROP COLUMN "id_classifier";

-- DropTable
DROP TABLE "Classifier";
