/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nip]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gambar_profil` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jabatan` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenis_kelamin` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_lengkap` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nip` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `no_telp` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('PRIA', 'WANITA');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "gambar_profil" TEXT NOT NULL,
ADD COLUMN     "jabatan" TEXT NOT NULL,
ADD COLUMN     "jenis_kelamin" "Gender" NOT NULL,
ADD COLUMN     "nama_lengkap" TEXT NOT NULL,
ADD COLUMN     "nip" INTEGER NOT NULL,
ADD COLUMN     "no_telp" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role_id" INTEGER NOT NULL,
ADD COLUMN     "status_aktif" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type_Surat" (
    "id" SERIAL NOT NULL,
    "nama_type" TEXT NOT NULL,

    CONSTRAINT "Type_Surat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kriteria_Surat" (
    "id" SERIAL NOT NULL,
    "nama_kriteria" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kriteria_Surat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jenis_Surat" (
    "id" SERIAL NOT NULL,
    "nama_jenis" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Jenis_Surat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kategori_Surat" (
    "id" SERIAL NOT NULL,
    "nama_kategori" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kategori_Surat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Surat" (
    "id" SERIAL NOT NULL,
    "no_surat" TEXT NOT NULL,
    "id_type_surat" INTEGER NOT NULL,
    "perihal_surat" TEXT NOT NULL,
    "tanggal_surat" TIMESTAMP(3) NOT NULL,
    "id_jenis_surat" INTEGER NOT NULL,
    "id_kriteria_surat" INTEGER NOT NULL,
    "pengirim_surat" TEXT NOT NULL,
    "id_penerima_surat" INTEGER NOT NULL,
    "status_surat" BOOLEAN NOT NULL DEFAULT false,
    "filename" TEXT NOT NULL,
    "path_file" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Surat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Surat_Keluar" (
    "id" SERIAL NOT NULL,
    "id_surat" INTEGER NOT NULL,
    "tujuan_surat" TEXT NOT NULL,
    "tanggal_kirim" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Surat_Keluar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Surat_Masuk" (
    "id" SERIAL NOT NULL,
    "id_surat" INTEGER NOT NULL,
    "no_agenda" INTEGER NOT NULL,
    "id_kategori_surat" INTEGER NOT NULL,
    "jumlah_lampiran" INTEGER NOT NULL,
    "id_user_disposisi" INTEGER NOT NULL,
    "tanggal_terima" TIMESTAMP(3) NOT NULL,
    "id_status_disposisi" INTEGER NOT NULL,
    "tanggal_ajuan_disposisi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "keterangan" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Surat_Masuk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status_Disposisi" (
    "id" SERIAL NOT NULL,
    "nama_status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Status_Disposisi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nip_key" ON "User"("nip");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Surat" ADD CONSTRAINT "Surat_id_type_surat_fkey" FOREIGN KEY ("id_type_surat") REFERENCES "Type_Surat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Surat" ADD CONSTRAINT "Surat_id_jenis_surat_fkey" FOREIGN KEY ("id_jenis_surat") REFERENCES "Jenis_Surat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Surat" ADD CONSTRAINT "Surat_id_kriteria_surat_fkey" FOREIGN KEY ("id_kriteria_surat") REFERENCES "Kriteria_Surat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Surat" ADD CONSTRAINT "Surat_id_penerima_surat_fkey" FOREIGN KEY ("id_penerima_surat") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Surat_Keluar" ADD CONSTRAINT "Surat_Keluar_id_surat_fkey" FOREIGN KEY ("id_surat") REFERENCES "Surat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Surat_Masuk" ADD CONSTRAINT "Surat_Masuk_id_surat_fkey" FOREIGN KEY ("id_surat") REFERENCES "Surat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Surat_Masuk" ADD CONSTRAINT "Surat_Masuk_id_kategori_surat_fkey" FOREIGN KEY ("id_kategori_surat") REFERENCES "Kategori_Surat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Surat_Masuk" ADD CONSTRAINT "Surat_Masuk_id_user_disposisi_fkey" FOREIGN KEY ("id_user_disposisi") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Surat_Masuk" ADD CONSTRAINT "Surat_Masuk_id_status_disposisi_fkey" FOREIGN KEY ("id_status_disposisi") REFERENCES "Status_Disposisi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
