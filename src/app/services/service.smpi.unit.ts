import Axios from "../axios";
import { AxiosResponse } from "axios";
import { ResponseApi } from "../types/response";
import { SpmiUnit } from "../types/spmi.unit";
import { SpmiServiceProps } from "./service.spmi.nilai-mutu";

export const SpmiUnitService = {
  async getListUnit(
    params?: SpmiServiceProps
  ): Promise<ResponseApi<SpmiUnit[]>> {
    let url = `/api/unit/?back_office&no_page`;

    if (params?.search !== undefined) {
      url += `&search=${params?.search}`;
    }

    const response: AxiosResponse<ResponseApi<SpmiUnit[]>> = await Axios({
      method: "GET",
      url: url,
    });
    return response.data;
  },
  async getUnitById(id: string): Promise<SpmiUnit> {
    const response: AxiosResponse<ResponseApi<SpmiUnit>> = await Axios({
      method: "GET",
      url: "/api/unit/?back_office",
      params: { id },
    });

    return response.data.data;
  },
};
