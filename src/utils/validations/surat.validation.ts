import path from "path";
import * as Yup from "yup";
import prisma from "../../db";

// Helper untuk deteksi type surat dari array atau number
const isTypeSurat = (val: unknown, type: number): boolean =>
  Array.isArray(val) ? val[0] === type : val === type;

export const createSuratSchema = Yup.object().shape({
  no_surat: Yup.string().required("No surat harus diisi"),

  id_type_surat: Yup.number()
    .required("Type surat harus diisi")
    .test("type-exists", "Type surat tidak valid", async (value) => {
      const exists = await prisma.type_Surat.findUnique({
        where: { id: value },
      });
      return !!exists;
    }),

  perihal_surat: Yup.string().required("Perihal surat harus diisi"),
  tanggal_surat: Yup.date().required("Tanggal surat harus diisi"),

  id_jenis_surat: Yup.number()
    .required("Jenis surat harus diisi")
    .test("jenis-exists", "Jenis surat tidak valid", async (value) => {
      const exists = await prisma.jenis_Surat.findUnique({
        where: { id: value },
      });
      return !!exists;
    }),

  id_kriteria_surat: Yup.number()
    .required("Kriteria surat harus diisi")
    .test("kriteria-exists", "Kriteria surat tidak valid", async (value) => {
      const exists = await prisma.kriteria_Surat.findUnique({
        where: { id: value },
      });
      return !!exists;
    }),

  pengirim_surat: Yup.string().required("Pengirim surat harus diisi"),
  penerima_surat: Yup.string().required("Penerima surat harus diisi"),
  filename: Yup.string().required("File name harus diisi"),
  path_file: Yup.string().required("Path file harus diisi"),
  pengarsip: Yup.string().required("Pengarsip surat harus diisi"),

  created_at: Yup.date().default(() => new Date()),

  no_agenda: Yup.number().when("id_type_surat", (id_type_surat, schema) => {
    return isTypeSurat(id_type_surat, 1)
      ? schema.required("No agenda harus diisi")
      : schema.notRequired();
  }),

  id_kategori_surat: Yup.number()
    .when("id_type_surat", (id_type_surat, schema) => {
      return isTypeSurat(id_type_surat, 1)
        ? schema.required("Kategori surat harus diisi")
        : schema;
    })
    .test("kategori-exists", "Kategori surat tidak valid", async (value) => {
      if (!value) return true;
      const exists = await prisma.kategori_Surat.findUnique({
        where: { id: value },
      });
      return !!exists;
    }),

  jumlah_lampiran: Yup.number().when(
    "id_type_surat",
    (id_type_surat, schema) => {
      return isTypeSurat(id_type_surat, 1)
        ? schema.required("Jumlah lampiran harus diisi")
        : schema.notRequired();
    }
  ),

  id_user_disposisi: Yup.string()
    .transform((value) => (value === "" ? undefined : value))
    .when("id_type_surat", (id_type_surat, schema) => {
      return isTypeSurat(id_type_surat, 1)
        ? schema.optional()
        : schema.notRequired();
    })
    .test("user-exists", "User disposisi tidak valid", async (value) => {
      if (!value) return true;
      const exists = await prisma.user.findUnique({ where: { id: value } });
      return !!exists;
    }),

  tanggal_terima: Yup.date().when("id_type_surat", (id_type_surat, schema) => {
    return isTypeSurat(id_type_surat, 1)
      ? schema.required("Tanggal terima harus diisi")
      : schema.notRequired();
  }),

  id_status_disposisi: Yup.number().optional(),
  tanggal_ajuan_disposisi: Yup.date().optional(),
  keterangan: Yup.string().optional(),

  tanggal_kirim: Yup.date().when("id_type_surat", (id_type_surat, schema) => {
    return isTypeSurat(id_type_surat, 2)
      ? schema.required("Tanggal kirim harus diisi")
      : schema.notRequired();
  }),
});
