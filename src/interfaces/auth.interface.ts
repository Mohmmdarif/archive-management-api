interface IRegisterPayload {
  nama_lengkap: string;
  email: string;
  nip: string;
  password: string;
  id_jenis_kelamin: number;
  role_id: number;
}

interface ILoginPayload {
  email: string;
  password: string;
}

export type { IRegisterPayload, ILoginPayload };
