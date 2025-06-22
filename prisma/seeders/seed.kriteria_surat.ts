import prisma from "../../src/db";

export async function seedKriteriaSurat() {
  const kriteriaSurat = [
    {
      nama_kriteria: "Permohonan",
      keterangan: "Surat yang berisi permohonan",
    },
    {
      nama_kriteria: "Keputusan",
      keterangan: "Surat yang berisi keputusan",
    },
    {
      nama_kriteria: "Riset",
      keterangan: "Surat pengajuan riset",
    },
    {
      nama_kriteria: "Undangan",
      keterangan: "Surat yang berisi undangan",
    },
    {
      nama_kriteria: "Keterangan",
      keterangan: "Surat yang berisi keterangan",
    },
  ];

  await prisma.kriteria_Surat.createMany({
    data: kriteriaSurat,
    skipDuplicates: true,
  });

  console.log("--- kriteria surat ---");
}
