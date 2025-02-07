/*
  Warnings:

  - The primary key for the `Disposisi` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Surat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Surat_Keluar` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Surat_Masuk` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Disposisi" DROP CONSTRAINT "Disposisi_id_penerima_fkey";

-- DropForeignKey
ALTER TABLE "Disposisi" DROP CONSTRAINT "Disposisi_id_pengaju_fkey";

-- DropForeignKey
ALTER TABLE "Disposisi" DROP CONSTRAINT "Disposisi_id_surat_masuk_fkey";

-- DropForeignKey
ALTER TABLE "Surat" DROP CONSTRAINT "Surat_id_penerima_surat_fkey";

-- DropForeignKey
ALTER TABLE "Surat_Keluar" DROP CONSTRAINT "Surat_Keluar_id_surat_fkey";

-- DropForeignKey
ALTER TABLE "Surat_Masuk" DROP CONSTRAINT "Surat_Masuk_id_surat_fkey";

-- DropForeignKey
ALTER TABLE "Surat_Masuk" DROP CONSTRAINT "Surat_Masuk_id_user_disposisi_fkey";

-- AlterTable
ALTER TABLE "Disposisi" DROP CONSTRAINT "Disposisi_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "id_surat_masuk" SET DATA TYPE TEXT,
ALTER COLUMN "id_pengaju" SET DATA TYPE TEXT,
ALTER COLUMN "id_penerima" SET DATA TYPE TEXT,
ADD CONSTRAINT "Disposisi_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Disposisi_id_seq";

-- AlterTable
ALTER TABLE "Surat" DROP CONSTRAINT "Surat_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "id_penerima_surat" SET DATA TYPE TEXT,
ADD CONSTRAINT "Surat_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Surat_id_seq";

-- AlterTable
ALTER TABLE "Surat_Keluar" DROP CONSTRAINT "Surat_Keluar_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "id_surat" SET DATA TYPE TEXT,
ADD CONSTRAINT "Surat_Keluar_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Surat_Keluar_id_seq";

-- AlterTable
ALTER TABLE "Surat_Masuk" DROP CONSTRAINT "Surat_Masuk_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "id_surat" SET DATA TYPE TEXT,
ALTER COLUMN "id_user_disposisi" SET DATA TYPE TEXT,
ADD CONSTRAINT "Surat_Masuk_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Surat_Masuk_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Surat" ADD CONSTRAINT "Surat_id_penerima_surat_fkey" FOREIGN KEY ("id_penerima_surat") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Surat_Keluar" ADD CONSTRAINT "Surat_Keluar_id_surat_fkey" FOREIGN KEY ("id_surat") REFERENCES "Surat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Surat_Masuk" ADD CONSTRAINT "Surat_Masuk_id_surat_fkey" FOREIGN KEY ("id_surat") REFERENCES "Surat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Surat_Masuk" ADD CONSTRAINT "Surat_Masuk_id_user_disposisi_fkey" FOREIGN KEY ("id_user_disposisi") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disposisi" ADD CONSTRAINT "Disposisi_id_surat_masuk_fkey" FOREIGN KEY ("id_surat_masuk") REFERENCES "Surat_Masuk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disposisi" ADD CONSTRAINT "Disposisi_id_pengaju_fkey" FOREIGN KEY ("id_pengaju") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disposisi" ADD CONSTRAINT "Disposisi_id_penerima_fkey" FOREIGN KEY ("id_penerima") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
