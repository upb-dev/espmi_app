import { SpmiBase } from "./spmi.base";
import { SpmiLembagaAkreditasi } from "./spmi.lembaga-akreditasi";
import { SpmiTahunPeriode } from "./spmi.tahun-periode";

export interface SpmiNilaiMutu extends SpmiBase {
    nilai_mutu: number,
    desc: string;
    tahun_date: SpmiTahunPeriode;
    lembaga_akreditasi: SpmiLembagaAkreditasi
}