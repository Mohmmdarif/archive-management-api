import path from "path";
import * as Yup from "yup";
import prisma from "../../db";

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

  id_penerima_surat: Yup.string()
    .required("Penerima surat harus diisi")
    .test("user-exists", "User penerima tidak valid", async (value) => {
      const exists = await prisma.user.findUnique({ where: { id: value } });
      return !!exists;
    }),

  file: Yup.mixed<Express.Multer.File>()
    .required("File harus diupload")
    .test("fileType", "Hanya PDF yang diizinkan", (value) => {
      if (!value) return false;
      const ext = path.extname(value.originalname).toLowerCase();
      return ext === ".pdf";
    })
    .test(
      "fileSize",
      "Ukuran file maksimal 5MB",
      (value) => value?.size <= 5 * 1024 * 1024 // 5MB
    ),
});
