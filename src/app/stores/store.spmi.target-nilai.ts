import { create } from "zustand";
import {
  SpmiTargetNilai,
  SpmiTargetNilaiDataTable,
  SpmiTargetNilaiPayload,
} from "../types/spmi.target-nilai";
import { devtools } from "zustand/middleware";
import { SpmiTargetNilaiService } from "../services/service.spmi.target-nilai";
import { SpmiServiceProps } from "../services/service.spmi.nilai-mutu";

type SpmiTargetNilaiStoreProps = {
  loading: boolean;
  error: boolean;
  targetNilai?: SpmiTargetNilai;
  spmiTargetNilaiDataTable: SpmiTargetNilaiDataTable[];
  listTargetNilai: SpmiTargetNilai[];
  getListTargetNilai: (props?: SpmiServiceProps) => Promise<void>;
};

export const SpmiTargetNilaiStore = create<SpmiTargetNilaiStoreProps>()(
  devtools((set) => ({
    loading: false,
    error: false,
    listTargetNilai: [],
    spmiTargetNilaiDataTable: [],
    getListTargetNilai: async (props?: SpmiServiceProps): Promise<void> => {
      const returnData: SpmiTargetNilaiDataTable[] = [];
      try {
        set(
          (prevState) => ({
            ...prevState,
            loading: true,
          }),
          false,
          "get list target nilai"
        );
        const response = await SpmiTargetNilaiService.getListTargetNilai(props);
        set(
          (prevState) => ({
            ...prevState,
            listTargetNilai: response.data,
          }),
          false,
          "set target nilai"
        );
        response.data.map((item, i) => {
          returnData.push({
            id: i + 1,
            program_studi: item.program_studi_data?.name!,
            target_nilai: item.nilai_target,
          });
        });
        set((state) => ({
          ...state,
          spmiTargetNilaiDataTable: returnData,
        }));
      } catch (error) {
        set(
          (prevState) => ({
            ...prevState,
            loading: false,
            error: true,
          }),
          false,
          "error get list target nilai"
        );
        throw error;
      } finally {
        set(
          (prevState) => ({
            ...prevState,
            loading: false,
          }),
          false,
          "success get target nilai"
        );
      }
    },
  }))
);

type TargetNilaiActivityState = {
  activity: "edit" | "add" | "reset";
  initialValue: SpmiTargetNilaiPayload;
  setActivity: (activity: string, data?: SpmiTargetNilai) => void;
};
export const spmiTargetNilaiActivity = create<TargetNilaiActivityState>()(
  devtools((set) => ({
    activity: "add",
    initialValue: {
      nilai_target: 0,
      desc: "",
      lembaga_akreditasi: null,
      program_studi: null,
      tahun: null,
    },
    setActivity: (activity: string, data?: SpmiTargetNilai): void => {
      switch (activity) {
        case "edit":
          set(() => ({
            activity: activity,
            initialValue: {
              nilai_target: data?.nilai_target!,
              desc: data?.desc,
              lembaga_akreditasi: data?.lembaga_akreditasi,
              program_studi: data?.program_studi_data?.id,
              tahun: data?.tahun,
            },
          }));
          break;
        case "reset":
          set(() => ({
            activity: activity,
            initialValue: {
              nilai_target: 0,
              desc: "",
              lembaga_akreditasi: null,
              program_studi: null,
              tahun: null,
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
