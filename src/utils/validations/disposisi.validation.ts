import * as Yup from "yup";
import prisma from "../../db";

export const createDisposisiSchema = Yup.object().shape({
  id_surat_masuk: Yup.string().required("Id surat masuk harus diisi"),
  id_pengaju: Yup.string().required("Id pengaju harus diisi"),
  id_penerima: Yup.string().when(
    "id_status_disposisi",
    (id_status_disposisi, schema) => {
      return Number(id_status_disposisi) !== 6 &&
        Number(id_status_disposisi) !== 8
        ? schema.required("Id penerima harus diisi")
        : schema.notRequired(); // Tidak diperlukan jika status adalah "selesai" atau "arsipkan"
    }
  ),
  pesan_disposisi: Yup.string().required("Pesan disposisi harus diisi"),
  id_status_disposisi: Yup.string().test(
    "status-exists",
    "Status disposisi tidak valid",
    async (value) => {
      const exists = await prisma.status_Disposisi.findUnique({
        where: { id: value ? parseInt(value, 10) : undefined },
      });
      return !!exists;
    }
  ),
  parent_disposisi_id: Yup.string().nullable(),
});
