import { SpmiBase } from "./spmi.base";
import { SpmiLembagaAkreditasi } from "./spmi.lembaga-akreditasi";
import { SpmiTahunPeriode } from "./spmi.tahun-periode";

export interface SpmiNilaiMutu extends SpmiBase {
    nilai_mutu: number,
    desc: string;
    tahun_data: SpmiTahunPeriode;
    lembaga_akreditasi_data: SpmiLembagaAkreditasi
}

export interface SpmiNilaiMutuDataTable {
    id: number;
    nilai_mutu: number;
    desc: string;
    tahun: number;
    lembaga_akreditasi: string
}

export interface SpmiNilaiMutuPayload {
    nilai_mutu: number | null,
    desc?: string | null;
    tahun_id?: string | null;
    lembaga_id?: string | null
}