export interface ISurat {
  id_surat: string;
  no_surat: string;
  id_type_surat: number;
  perihal_surat: string;
  tanggal_surat: Date;
  id_jenis_surat: number;
  id_kriteria_surat: number;
  pengirim_surat: string;
  id_penerima_surat: string;
  status_surat: boolean;
  filename: string;
  path_file: string;
}
