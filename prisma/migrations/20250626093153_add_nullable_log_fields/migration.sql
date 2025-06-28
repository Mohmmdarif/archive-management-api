-- DropForeignKey
ALTER TABLE "ActivityLogDeletion" DROP CONSTRAINT "ActivityLogDeletion_id_surat_fkey";

-- AlterTable
ALTER TABLE "ActivityLogDeletion" ADD COLUMN     "jenis_surat" INTEGER,
ADD COLUMN     "kriteria_surat" INTEGER,
ADD COLUMN     "no_surat" TEXT,
ADD COLUMN     "penerima_surat" TEXT,
ADD COLUMN     "pengarsip" TEXT,
ADD COLUMN     "pengirim_surat" TEXT,
ADD COLUMN     "perihal_surat" TEXT,
ADD COLUMN     "tanggal_surat" TIMESTAMP(3),
ADD COLUMN     "type_surat" INTEGER,
ALTER COLUMN "id_surat" DROP NOT NULL;
