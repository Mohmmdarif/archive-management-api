import prisma from "../../src/db";

export async function seedJenisKelamin() {
  const jenisKelamin = [
    {
      jenis_kelamin: "Pria",
    },
    {
      jenis_kelamin: "Wanita",
    },
  ];

  await prisma.jenis_Kelamin.createMany({
    data: jenisKelamin,
    skipDuplicates: true,
  });
  console.log("--- jenis kelamin ---");
}
