import { SpmiBase } from "./spmi.base";

export interface SpmiUnitPenunjang extends SpmiBase {
  code: string;
  address: string;
  desc: string;
}
export interface SpmiUnitPenunjangPayload {
  code: string;
  address: string;
  desc: string;
}

export interface SpmiUnitPenunjangDataTable {
  id: number;
  code: string;
  address: string;
  desc: string;
}
