-- DropForeignKey
ALTER TABLE "Surat_Masuk" DROP CONSTRAINT "Surat_Masuk_id_user_disposisi_fkey";

-- AlterTable
ALTER TABLE "Surat_Masuk" ALTER COLUMN "id_user_disposisi" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Surat_Masuk" ADD CONSTRAINT "Surat_Masuk_id_user_disposisi_fkey" FOREIGN KEY ("id_user_disposisi") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
