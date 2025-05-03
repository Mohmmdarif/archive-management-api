/*
  Warnings:

  - Added the required column `id_classifier` to the `Surat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Surat" ADD COLUMN     "id_classifier" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Classifier" (
    "id" SERIAL NOT NULL,
    "nama_classifier" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Classifier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Classifier_nama_classifier_key" ON "Classifier"("nama_classifier");

-- AddForeignKey
ALTER TABLE "Surat" ADD CONSTRAINT "Surat_id_classifier_fkey" FOREIGN KEY ("id_classifier") REFERENCES "Classifier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
