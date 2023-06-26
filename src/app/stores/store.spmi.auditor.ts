import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  SpmiAuditor,
  SpmiAuditorPayload,
  SpmiAuditorDataTable,
} from "../types/spmi.auditor";
import { SpmiAuditorService } from "../services/service.spmi.auditor";
import { SpmiServiceProps } from "../services/service.spmi.nilai-mutu";

type SpmiAuditorStoreProps = {
  loading: boolean;
  error: boolean;
  auditor: SpmiAuditor | null;
  listAuditor: SpmiAuditor[];
  spmiAuditorDataTable: SpmiAuditorDataTable[];
  getListAuditor: (props?: SpmiServiceProps) => Promise<void>;
};

export const SpmiAuditorStore = create<SpmiAuditorStoreProps>()(
  devtools((set) => ({
    loading: false,
    error: false,
    auditor: null,
    listAuditor: [],
    spmiAuditorDataTable: [],
    getListAuditor: async (props?: SpmiServiceProps): Promise<void> => {
      const returnData: SpmiAuditorDataTable[] = [];
      try {
        set(
          (prevState) => ({
            ...prevState,
            loading: true,
          }),
          false,
          "get list auditor"
        );
        const response = await SpmiAuditorService.getListAuditor(props);

        set(
          (prevState) => ({
            ...prevState,
            listAuditor: response.data,
          }),
          false,
          "set list auditor"
        );
        if (response.data.length !== 0) {
          response.data.map((item, i) => {
            returnData.push({
              id: (i + 1) as number,
              nik: item.nik,
              nama_lengkap: `${item.gelar_depan} ${item.nama_lengkap} ${item.gelar_belakang}`,
              instansi: item.instansi,
            });
          });
          set(
            (state) => ({
              ...state,
              spmiAuditorDataTable: returnData,
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
          "error get list auditor"
        );
        console.log(error);
        throw error;
      } finally {
        set(
          (prevState) => ({
            ...prevState,
            loading: false,
          }),
          false,
          "success get auditor"
        );
      }
    },
  }))
);

type spmiAuditorActivityState = {
  activity: "edit" | "reset" | "add";
  initialValue: SpmiAuditorPayload;
  setActivity: (activity: string, data?: SpmiAuditor) => void;
};

export const spmiAuditorActivity = create<spmiAuditorActivityState>()(
  devtools((set) => ({
    activity: "add",
    initialValue: {
      nik: "",
      gelar_belakang: "",
      gelar_depan: "",
      lembaga_akreditasi_id: [],
      gender: null,
      instansi: "",
      jabatan: "",
      units_id: [],
      nama_lengkap: "",
    },
    setActivity(activity, data) {
      switch (activity) {
        case "edit":
          set(() => ({
            activity: activity,
            initialValue: {
              nik: data!.nik,
              gelar_belakang: data!.gelar_belakang,
              gelar_depan: data!.gelar_belakang,
              lembaga_akreditasi_id: data!.lembaga_akreditasi_data.map(
                (data) => data.id!
              ),
              gender: data!.gender,
              instansi: data!.instansi,
              jabatan: data!.jabatan,
              units_id: data!.units_data.map((data) => data.id!),
              nama_lengkap: data!.nama_lengkap,
            },
          }));
          break;
        case "reset":
          set(() => ({
            activity: activity,
            initialValue: {
              nik: "",
              gelar_belakang: "",
              gelar_depan: "",
              lembaga_akreditasi_id: [],
              gender: null,
              instansi: "",
              jabatan: "",
              units_id: [],
              nama_lengkap: "",
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
