import prisma from "../../src/db";

export async function seedRoles() {
  const roles = [
    { nama_role: "Koordinator TU" },
    { nama_role: "Pimpinan" },
    { nama_role: "Arsiparis Surat Masuk" },
    { nama_role: "Arsiparis Surat Keluar" },
  ];

  await prisma.role.createMany({
    data: roles,
    skipDuplicates: true,
  });
  console.log("--- roles ---");
}
