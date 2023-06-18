import { SpmiBase } from "./spmi.base";

export interface SpmiTahunPeriode extends SpmiBase {
    tahun: number;
    is_active: boolean
}