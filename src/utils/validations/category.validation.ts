import * as Yup from "yup";

export const categorySchema = Yup.object().shape({
  nama_kategori: Yup.string().required("Name category is required"),
  keterangan: Yup.string().optional(),
});
