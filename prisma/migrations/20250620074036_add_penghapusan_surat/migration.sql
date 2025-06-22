-- AlterTable
ALTER TABLE "Surat" ADD COLUMN     "alasan_penghapusan_surat" TEXT,
ADD COLUMN     "id_user_pengaju_penghapusan" TEXT,
ADD COLUMN     "status_penghapusan_surat" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Surat" ADD CONSTRAINT "Surat_id_user_pengaju_penghapusan_fkey" FOREIGN KEY ("id_user_pengaju_penghapusan") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
