/*
  Warnings:

  - You are about to drop the column `id_penerima_surat` on the `Surat` table. All the data in the column will be lost.
  - Added the required column `penerima_surat` to the `Surat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pengarsip` to the `Surat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Surat" DROP CONSTRAINT "Surat_id_penerima_surat_fkey";

-- AlterTable
ALTER TABLE "Surat" DROP COLUMN "id_penerima_surat",
ADD COLUMN     "penerima_surat" TEXT NOT NULL,
ADD COLUMN     "pengarsip" TEXT NOT NULL;
