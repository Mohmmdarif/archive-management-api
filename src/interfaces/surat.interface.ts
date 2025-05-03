export interface ISurat {
  id: string;
  no_surat: string;
  id_type_surat: number;
  perihal_surat: string;
  tanggal_surat: Date;
  id_jenis_surat: number;
  id_kriteria_surat: number;
  pengirim_surat: string;
  penerima_surat: string;
  status_surat: boolean;
  filename: string;
  path_file: string;
  pengarsip: string;
  created_at: Date;

  // Optional fields for surat_masuk
  no_agenda?: number;
  id_kategori_surat?: number;
  jumlah_lampiran?: number;
  id_user_disposisi?: string | null;
  tanggal_terima?: Date;
  id_status_disposisi?: number;
  tanggal_ajuan_disposisi?: Date;
  keterangan?: string;

  // Optional fields for surat_keluar
  tanggal_kirim?: Date;
}
