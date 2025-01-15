/*
  Warnings:

  - You are about to drop the column `jenis_kelamin` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nama_role]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nama_role` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_jenis_kelamin` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "nama_role" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "jenis_kelamin",
ADD COLUMN     "id_jenis_kelamin" INTEGER NOT NULL,
ALTER COLUMN "gambar_profil" DROP NOT NULL,
ALTER COLUMN "jabatan" DROP NOT NULL;

-- DropEnum
DROP TYPE "Gender";

-- CreateTable
CREATE TABLE "Jenis_Kelamin" (
    "id" SERIAL NOT NULL,
    "jenis_kelamin" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Jenis_Kelamin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Jenis_Kelamin_jenis_kelamin_key" ON "Jenis_Kelamin"("jenis_kelamin");

-- CreateIndex
CREATE UNIQUE INDEX "Role_nama_role_key" ON "Role"("nama_role");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_jenis_kelamin_fkey" FOREIGN KEY ("id_jenis_kelamin") REFERENCES "Jenis_Kelamin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
