import prisma from "../../src/db";

export async function seedKriteriaSurat() {
  const kriteriaSurat = [
    {
      nama_kriteria: "Permohonan",
      keterangan: "Surat yang berisi permohonan",
    },
    {
      nama_kriteria: "Edaran",
      keterangan: "Surat yang berisi edaran",
    },
  ];

  await prisma.kriteria_Surat.createMany({
    data: kriteriaSurat,
    skipDuplicates: true,
  });

  console.log("--- kriteria surat ---");
}
