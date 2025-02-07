export interface IUser {
  id: string;
  nama_lengkap: string;
  nip: string;
  no_telp: string;
  jabatan?: string;
  gambar_profil?: string;
  status_aktif: boolean;
  id_jenis_kelamin: number;
  role_id: number;
}
