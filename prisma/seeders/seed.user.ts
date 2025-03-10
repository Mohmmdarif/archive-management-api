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
    {
      nama_lengkap: "Khairani Mahesa",
      email: "rani@gmail.com",
      nip: "059387736488",
      password: hashedPassword,
      id_jenis_kelamin: 2,
      role_id: 2,
    },
    {
      nama_lengkap: "Dony Mumbay",
      email: "dony@gmail.com",
      nip: "059388834223",
      password: hashedPassword,
      id_jenis_kelamin: 1,
      role_id: 3,
    },
    {
      nama_lengkap: "Syncronous",
      email: "sync@gmail.com",
      nip: "059388843563",
      password: hashedPassword,
      id_jenis_kelamin: 1,
      role_id: 4,
    },
  ];

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log("--- users ---");
}
