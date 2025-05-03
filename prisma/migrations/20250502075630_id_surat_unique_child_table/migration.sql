/*
  Warnings:

  - A unique constraint covering the columns `[id_surat]` on the table `Surat_Keluar` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_surat]` on the table `Surat_Masuk` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Surat_Keluar_id_surat_key" ON "Surat_Keluar"("id_surat");

-- CreateIndex
CREATE UNIQUE INDEX "Surat_Masuk_id_surat_key" ON "Surat_Masuk"("id_surat");
