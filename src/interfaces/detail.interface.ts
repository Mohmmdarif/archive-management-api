interface IBase {
  keterangan: string;
}

export interface ICategoryPayload extends IBase {
  nama_kategori: string;
}

export interface ITypePayload extends IBase {
  nama_jenis: string;
}

export interface ICriteriaPayload extends IBase {
  nama_kriteria: string;
}
