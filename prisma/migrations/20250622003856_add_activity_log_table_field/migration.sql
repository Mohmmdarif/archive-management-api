/*
  Warnings:

  - You are about to drop the column `action` on the `ActivityLogDeletion` table. All the data in the column will be lost.
  - You are about to drop the column `remarks` on the `ActivityLogDeletion` table. All the data in the column will be lost.
  - You are about to drop the column `target` on the `ActivityLogDeletion` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `ActivityLogDeletion` table. All the data in the column will be lost.
  - The `status_penghapusan_surat` column on the `Surat` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `id_surat` to the `ActivityLogDeletion` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusPenghapusan" AS ENUM ('NONE', 'REQUESTED', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "ActivityLogDeletion" DROP COLUMN "action",
DROP COLUMN "remarks",
DROP COLUMN "target",
DROP COLUMN "timestamp",
ADD COLUMN     "alasan" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id_surat" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Surat" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "status_penghapusan_surat",
ADD COLUMN     "status_penghapusan_surat" "StatusPenghapusan" NOT NULL DEFAULT 'NONE';

-- AddForeignKey
ALTER TABLE "ActivityLogDeletion" ADD CONSTRAINT "ActivityLogDeletion_id_surat_fkey" FOREIGN KEY ("id_surat") REFERENCES "Surat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
