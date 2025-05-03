import prisma from "../../src/db";

export async function seedStatusDisposisi() {
  const status = [
    { nama_status: "Belum Didisposisi" },
    { nama_status: "Didisposisikan ke Wakil Dekan" },
    { nama_status: "Didisposisikan ke Ketua Prodi" },
    { nama_status: "Didisposisikan ke TU / Admin" },
    { nama_status: "Menunggu Tanggapan Pihak Terkait" },
    { nama_status: "Selesai / Arsipkan" },
    { nama_status: "Perlu Tindak Lanjut" },
    { nama_status: "Ditolak / Tidak Relevan" },
  ];

  await prisma.status_Disposisi.createMany({
    data: status,
    skipDuplicates: true,
  });

  console.log("--- status disposisi surat ---");
}
