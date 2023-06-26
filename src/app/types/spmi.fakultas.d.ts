import { SpmiBase } from "./spmi.base";

export interface SpmiFakultas extends SpmiBase {
  name: string;
}

export interface SpmiFakultasDataTable {
  id: number;
  name: string;
}

export interface SpmiFakultasPayload {
  name: string;
}
