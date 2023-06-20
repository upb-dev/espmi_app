import { create } from "zustand";
import { ResponseApi } from "../types/response";
import { SpmiProgramStudi } from "../types/spmi.program-studi";
import { devtools } from "zustand/middleware";
import { SpmiProgramStudiService } from "../services/service.spmi.program-studi";

type SpmiProgramStudiState = {
  loading: boolean;
  error: boolean;
  listProgramStudi: ResponseApi<SpmiProgramStudi[]> | null;
  getListProgramStudi: () => Promise<void>;
};

export const spmiProgramStudiStore = create<SpmiProgramStudiState>()(
  devtools((set) => ({
    loading: false,
    error: false,
    listProgramStudi: null,
    getListProgramStudi: async (): Promise<void> => {
      try {
        set(
          (prevState) => ({
            ...prevState,
            loading: true,
          }),
          false,
          "get list program studi"
        );
        const response = await SpmiProgramStudiService.getListProgramStudi();
        set(
          (prevState) => ({
            ...prevState,
            listProgramStudi: response,
          }),
          false,
          "set program studi"
        );
      } catch (error) {
        set(
          (prevState) => ({
            ...prevState,
            loading: false,
            error: true,
          }),
          false,
          "gagal get list program studi"
        );
        throw error;
      } finally {
        set(
          (prevState) => ({
            ...prevState,
            loading: false,
          }),
          false,
          "get list program studi finish"
        );
      }
    },
  }))
);
