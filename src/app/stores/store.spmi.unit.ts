import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { SpmiUnit } from "../types/spmi.unit";
import { SpmiUnitService } from "../services/service.smpi.unit";
import { SpmiServiceProps } from "../services/service.spmi.nilai-mutu";

type SpmiUnitStoreProps = {
  loading: boolean;
  error: boolean;
  unit: SpmiUnit | null;
  listUnit: SpmiUnit[];
  getListUnit: (props?: SpmiServiceProps) => Promise<void>;
};

export const SpmiUnitStore = create<SpmiUnitStoreProps>()(
  devtools((set) => ({
    loading: false,
    error: false,
    unit: null,
    listUnit: [],

    getListUnit: async (props?: SpmiServiceProps): Promise<void> => {
      try {
        set(
          (prevState) => ({
            ...prevState,
            loading: true,
          }),
          false,
          "get list unit"
        );
        const response = await SpmiUnitService.getListUnit(props);

        set(
          (prevState) => ({
            ...prevState,
            listUnit: response.data,
          }),
          false,
          "set list unit"
        );
      } catch (error) {
        set(
          (prevState) => ({
            ...prevState,
            loading: false,
            error: true,
          }),
          false,
          "error get list unit"
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
          "success get unit"
        );
      }
    },
  }))
);
