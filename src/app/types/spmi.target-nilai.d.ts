import { SpmiBase } from "./spmi.base";
import { SpmiProgramStudi } from "./spmi.program-studi";

export interface SpmiTargetNilai extends SpmiBase {
  program_studi?: string;
  tahun?: string;
  lembaga_akreditasi?: string;
  program_studi_data?: SpmiProgramStudi;
  nilai_target: number;
  desc: string;
}

export interface SpmiTargetNilaiDataTable {
  id: number;
  program_studi: string;
  target_nilai: number;
}

export interface SpmiTargetNilaiPayload {
  nilai_target: number;
  desc?: string;
  tahun?: string | null;
  lembaga_akreditasi?: string | null;
  program_studi?: string | null;
}
