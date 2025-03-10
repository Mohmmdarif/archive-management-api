import prisma from "../../src/db";

export async function seedJenisSurat() {
  const jenisSurat = [
    {
      nama_jenis: "Penting",
      keterangan: "Surat yang berisi informasi penting",
    },
    {
      nama_jenis: "Biasa",
      keterangan: "Surat yang berisi informasi biasa",
    },
    {
      nama_jenis: "Rahasia",
      keterangan: "Surat yang berisi informasi rahasia",
    },
  ];

  await prisma.jenis_Surat.createMany({
    data: jenisSurat,
    skipDuplicates: true,
  });

  console.log("--- jenis surat ---");
}
