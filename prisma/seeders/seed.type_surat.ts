import prisma from "../../src/db";

export async function seedTypeSurat() {
  const typeSurat = [
    {
      nama_type: "Surat Masuk",
    },
    {
      nama_type: "Surat Keluar",
    },
  ];

  await prisma.type_Surat.createMany({
    data: typeSurat,
    skipDuplicates: true,
  });

  console.log("--- type surat ---");
}
