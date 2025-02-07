import prisma from "../../src/db";
import { encrypt } from "../../src/utils/encryption";

export async function seedUser() {
  const password = "12345678";
  const hashedPassword = await encrypt(password);
  const users = [
    {
      nama_lengkap: "Mohammad Arif Fadhilah",
      email: "arif@gmail.com",
      nip: "05938045322",
      password: hashedPassword,
      id_jenis_kelamin: 2,
      role_id: 1,
    },
  ];

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log("Seed user selesai!");
}
