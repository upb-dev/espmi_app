import { create } from "zustand";
import { ResponseApi } from "../types/response";
import {
  SpmiFakultas,
  SpmiFakultasDataTable,
  SpmiFakultasPayload,
} from "../types/spmi.fakultas";
import { devtools } from "zustand/middleware";
import { SpmiFakultasService } from "../services/service.spmi.fakultas";
import { SpmiServiceProps } from "../services/service.spmi.nilai-mutu";

type SpmiFakultasState = {
  loading: boolean;
  error: boolean;
  listFakultas: ResponseApi<SpmiFakultas[]> | null;
  getListFakultas: (params?: SpmiServiceProps) => Promise<void>;
  spmiFakultasDataTable: SpmiFakultasDataTable[];
};

export const spmiFakultasStore = create<SpmiFakultasState>()(
  devtools((set) => ({
    loading: false,
    error: false,
    listFakultas: null,
    spmiFakultasDataTable: [],
    getListFakultas: async (params?: SpmiServiceProps): Promise<void> => {
      const returnData: SpmiFakultasDataTable[] = [];
      try {
        set(
          (prevState) => ({
            ...prevState,
            loading: true,
          }),
          false,
          "get list fakultas"
        );
        const response = await SpmiFakultasService.getListFakultas(params);
        set(
          (prevState) => ({
            ...prevState,
            listFakultas: response,
          }),
          false,
          "set fakultas"
        );
        if (response.data.length !== 0) {
          response.data.map((item, i) => {
            returnData.push({
              id: i + 1,
              name: item.name,
            });
          });
          set(
            (state) => ({
              ...state,
              spmiFakultasDataTable: returnData,
            }),
            false,
            "set data table"
          );
        }
      } catch (error) {
        set(
          (prevState) => ({
            ...prevState,
            loading: false,
            error: true,
          }),
          false,
          "gagal get list fakultas"
        );
        throw error;
      } finally {
        set(
          (prevState) => ({
            ...prevState,
            loading: false,
          }),
          false,
          "get list fakultas finish"
        );
      }
    },
  }))
);

type spmiFakultasActivityState = {
  activity: "edit" | "reset" | "add";
  initialValue: SpmiFakultasPayload;
  setActivity: (activity: string, data?: SpmiFakultasPayload) => void;
};

export const spmiFakultasActivity = create<spmiFakultasActivityState>()(
  devtools((set) => ({
    activity: "add",
    initialValue: {
      name: "",
    },
    setActivity(activity: string, data?: SpmiFakultasPayload) {
      switch (activity) {
        case "edit":
          set(() => ({
            activity: activity,
            initialValue: {
              name: data!.name,
            },
          }));
          break;
        case "reset":
          set(() => ({
            activity: activity,
            initialValue: {
              name: "",
            },
          }));
          break;
        default:
          set((state) => ({
            ...state,
          }));
      }
    },
  }))
);
