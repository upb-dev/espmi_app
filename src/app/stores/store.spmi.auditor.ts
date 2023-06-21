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
              id: i + 1,
              nik: item.nik,
              nama_lengkap: `${item.gelar_depan} ${item.nama_lengkap} ${item.gelar_belakang}`,
              // lembaga_akreditasi: "item.lembaga_akreditasi_data.name",
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
