export interface IDisposisiPayload {
  id_surat_masuk: string;
  id_pengaju: string;
  id_penerima: string;
  pesan_disposisi: string;
  id_status_disposisi: number;
  parent_disposisi_id?: string | null;
  created_at?: Date;
  updated_at?: Date;
}
