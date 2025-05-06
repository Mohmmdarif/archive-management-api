-- DropForeignKey
ALTER TABLE "Disposisi" DROP CONSTRAINT "Disposisi_id_penerima_fkey";

-- AlterTable
ALTER TABLE "Disposisi" ALTER COLUMN "id_penerima" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Disposisi" ADD CONSTRAINT "Disposisi_id_penerima_fkey" FOREIGN KEY ("id_penerima") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
