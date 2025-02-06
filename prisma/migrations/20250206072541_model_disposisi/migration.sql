-- CreateTable
CREATE TABLE "Disposisi" (
    "id" SERIAL NOT NULL,
    "id_surat_masuk" INTEGER NOT NULL,
    "id_pengaju" INTEGER NOT NULL,
    "id_penerima" INTEGER NOT NULL,
    "pesan_disposisi" TEXT NOT NULL,
    "id_status_disposisi" INTEGER NOT NULL,
    "tanggal_disposisi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Disposisi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Disposisi" ADD CONSTRAINT "Disposisi_id_surat_masuk_fkey" FOREIGN KEY ("id_surat_masuk") REFERENCES "Surat_Masuk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disposisi" ADD CONSTRAINT "Disposisi_id_pengaju_fkey" FOREIGN KEY ("id_pengaju") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disposisi" ADD CONSTRAINT "Disposisi_id_penerima_fkey" FOREIGN KEY ("id_penerima") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disposisi" ADD CONSTRAINT "Disposisi_id_status_disposisi_fkey" FOREIGN KEY ("id_status_disposisi") REFERENCES "Status_Disposisi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
