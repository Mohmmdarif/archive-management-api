import * as Yup from "yup";

export const createDisposisiSchema = Yup.object().shape({
  id_surat_masuk: Yup.string().required("Id surat masuk harus diisi"),
  id_pengaju: Yup.string().required("Id pengaju harus diisi"),
  id_penerima: Yup.string().required("Id penerima harus diisi"),
  pesan_disposisi: Yup.string().required("Pesan disposisi harus diisi"),
  id_status_disposisi: Yup.string().required("Id status disposisi harus diisi"),
  parent_disposisi_id: Yup.string().nullable(),
});
