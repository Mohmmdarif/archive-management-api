-- AlterTable
ALTER TABLE "Disposisi" ADD COLUMN     "parent_disposisi_id" TEXT;

-- AddForeignKey
ALTER TABLE "Disposisi" ADD CONSTRAINT "Disposisi_parent_disposisi_id_fkey" FOREIGN KEY ("parent_disposisi_id") REFERENCES "Disposisi"("id") ON DELETE SET NULL ON UPDATE CASCADE;
