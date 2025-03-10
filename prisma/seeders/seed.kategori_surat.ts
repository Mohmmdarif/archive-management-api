import prisma from "../../src/db";

export async function seedKategoriSurat() {
  const kategoriSurat = [
    {
      nama_kategori: "Akademik",
      keterangan: "Surat yang berhubungan dengan kegiatan akademik",
    },
  ];

  await prisma.kategori_Surat.createMany({
    data: kategoriSurat,
    skipDuplicates: true,
  });

  console.log("--- kategori surat ---");
}
