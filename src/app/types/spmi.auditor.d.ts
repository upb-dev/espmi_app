import { SpmiBase } from "./spmi.base";
import { SpmiLembagaAkreditasi } from "./spmi.lembaga-akreditasi";
import { SpmiUnit } from "./spmi.unit";

export interface SpmiAuditor extends SpmiBase {
  jenis_kelamin: string;
  units_data: SpmiUnit[];
  lembaga_akreditasi_data: SpmiLembagaAkreditasi;
  nik: string;
  gelar_depan: string;
  nama_lengkap: string;
  gelar_belakang: string;
  gender: number;
  lembaga_akreditasi_id?: string;
  units_id?: string;
  instansi: string;
  jabatan: string;
}

export interface SpmiAuditorPayload {
  nik: string;
  gelar_depan: string;
  nama_lengkap: string;
  gelar_belakang: string;
  lembaga_akreditasi_id: string;
  gender: number;
  instansi: string;
  jabatan: string;
  units_id: string[];
}

export interface SpmiAuditorDataTable {
  id: number;
  nik: string;
  nama_lengkap: string;
  // lembaga_akreditasi: string;
}
