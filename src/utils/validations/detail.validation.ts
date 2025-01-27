import * as Yup from "yup";

export const categorySchema = Yup.object().shape({
  nama_kategori: Yup.string().required("Name category is required"),
  keterangan: Yup.string().optional(),
});

export const typesSchema = Yup.object().shape({
  nama_jenis: Yup.string().required("Name type is required"),
  keterangan: Yup.string().optional(),
});

export const criteriaSchema = Yup.object().shape({
  nama_kriteria: Yup.string().required("Name criteria is required"),
  keterangan: Yup.string().optional(),
});
