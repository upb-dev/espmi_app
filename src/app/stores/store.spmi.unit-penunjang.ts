import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  SpmiUnitPenunjang,
  SpmiUnitPenunjangPayload,
  SpmiUnitPenunjangDataTable,
} from "../types/spmi.unit-penunjang";
import { SpmiUnitPenunjangService } from "../services/service.spmi.unit-penunjang";
import { SpmiServiceProps } from "../services/service.spmi.nilai-mutu";

type SpmiUnitPenunjangStoreProps = {
  loading: boolean;
  error: boolean;
  unitPenunjang: SpmiUnitPenunjang | null;
  listUnitPenunjang: SpmiUnitPenunjang[];
  spmiUnitPenunjangDataTable: SpmiUnitPenunjangDataTable[];
  getListUnitPenunjang: (props?: SpmiServiceProps) => Promise<void>;
};

export const SpmiUnitPenunjangStore = create<SpmiUnitPenunjangStoreProps>()(
  devtools((set) => ({
    loading: false,
    error: false,
    unitPenunjang: null,
    listUnitPenunjang: [],
    spmiUnitPenunjangDataTable: [],
    getListUnitPenunjang: async (props?: SpmiServiceProps): Promise<void> => {
      const returnData: SpmiUnitPenunjangDataTable[] = [];
      try {
        set(
          (prevState) => ({
            ...prevState,
            loading: true,
          }),
          false,
          "get list unitspmi.unit-penunjang"
        );
        const response = await SpmiUnitPenunjangService.getListUnitPenunjang(
          props
        );
        set(
          (prevState) => ({
            ...prevState,
            listUnitPenunjang: response.data,
          }),
          false,
          "set list unitspmi.unit-penunjang"
        );
        if (response.data.length !== 0) {
          response.data.map((item, i) => {
            returnData.push({
              id: (i + 1) as number,
              code: item.code,
              address: item.address,
              desc: item.desc,
            });
          });
          set(
            (state) => ({
              ...state,
              spmiUnitPenunjangDataTable: returnData,
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
          "error get list unitspmi.unit-penunjang"
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
          "success get unitspmi.unit-penunjang"
        );
      }
    },
  }))
);

type spmiUnitPenunjangActivityState = {
  activity: "edit" | "reset" | "add";
  initialValue: SpmiUnitPenunjangPayload;
  setActivity: (activity: string, data?: SpmiUnitPenunjang) => void;
};

export const spmiUnitPenunjangActivity =
  create<spmiUnitPenunjangActivityState>()(
    devtools((set) => ({
      activity: "add",
      initialValue: {
        code: "",
        address: "",
        desc: "",
      },
      setActivity(activity, data) {
        switch (activity) {
          case "edit":
            set(() => ({
              activity: activity,
              initialValue: {
                code: data!.code,
                address: data!.address,
                desc: data!.desc,
              },
            }));
            break;
          case "reset":
            set(() => ({
              activity: activity,
              initialValue: {
                code: "",
                address: "",
                desc: "",
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
