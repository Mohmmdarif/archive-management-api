import { seedJenisKelamin } from "./seed.jenis_kelamin";
import { seedRoles } from "./seed.roles";

async function main() {
  console.log("Seeders running...");
  await seedJenisKelamin();
  await seedRoles();
  console.log("Seeders finished!");
}

main().catch((e) => {
  console.error("Seeders failed! Error: ", e);
  process.exit(1);
});
