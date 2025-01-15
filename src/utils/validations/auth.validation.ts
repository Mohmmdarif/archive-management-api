import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  nama_lengkap: Yup.string().required("Nama lengkap harus diisi"),
  email: Yup.string().email().required("Email harus diisi"),
  nip: Yup.string().required("NIP harus diisi"),
  password: Yup.string()
    .required()
    .min(8, "Password must be at least 8 characters"),
  id_jenis_kelamin: Yup.number().required("Jenis kelamin harus diisi"),
  role_id: Yup.number().required("Role harus diisi"),
  gambar_profil: Yup.string().optional(),
  jabatan: Yup.string().optional(),
  no_telp: Yup.string().optional(),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required("Email harus diisi"),
  password: Yup.string().required("Password harus diisi"),
});
