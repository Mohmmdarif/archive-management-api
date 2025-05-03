import { seedJenisKelamin } from "./seed.jenis_kelamin";
import { seedJenisSurat } from "./seed.jenis_surat";
import { seedKategoriSurat } from "./seed.kategori_surat";
import { seedKriteriaSurat } from "./seed.kriteria_surat";
import { seedRoles } from "./seed.roles";
import { seedStatusDisposisi } from "./seed.status_disposisi";
import { seedTypeSurat } from "./seed.type_surat";
import { seedUser } from "./seed.user";

async function main() {
  console.log("Seeders are running...");
  await seedJenisKelamin();
  await seedRoles();
  await seedUser();
  await seedTypeSurat();
  await seedJenisSurat();
  await seedKriteriaSurat();
  await seedKategoriSurat();
  await seedStatusDisposisi();
  console.log("Seeders successfully generated!");
}

main().catch((e) => {
  console.error("Seeders failed! Error: ", e);
  process.exit(1);
});
