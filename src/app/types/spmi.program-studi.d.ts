import { SpmiBase } from "./spmi.base";
import { SpmiFakultas } from "./spmi.fakultas";

export interface SpmiProgramStudi extends SpmiBase {
  fakultas: SpmiFakultas;
  akreditasi: string;
  name: string;
  code: string;
  no_sk: string;
  start_akreditasi: Date;
  end_akreditasi: Date;
  file_akreditasi: string;
  address: string;
  desc: string;
}
