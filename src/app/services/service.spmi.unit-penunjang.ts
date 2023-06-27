import Axios from "../axios";
import { AxiosResponse } from "axios";
import { ResponseApi } from "../types/response";
import {
  SpmiUnitPenunjang,
  SpmiUnitPenunjangPayload,
} from "../types/spmi.unit-penunjang";
import { SpmiServiceProps } from "./service.spmi.nilai-mutu";

export const SpmiUnitPenunjangService = {
  async getListUnitPenunjang(
    params?: SpmiServiceProps
  ): Promise<ResponseApi<SpmiUnitPenunjang[]>> {
    let url = `/api/unit-penunjang/?back_office&no_page`;

    if (params?.search !== undefined) {
      url += `&search=${params?.search}`;
    }

    const response: AxiosResponse<ResponseApi<SpmiUnitPenunjang[]>> =
      await Axios({
        method: "GET",
        url: url,
      });
    return response.data;
  },
  async getUnitPenunjangById(id: string): Promise<SpmiUnitPenunjang> {
    const response: AxiosResponse<ResponseApi<SpmiUnitPenunjang>> = await Axios(
      {
        method: "GET",
        url: "/api/unit-penunjang/?back_office",
        params: { id },
      }
    );

    return response.data.data;
  },
  async updateUnitPenunjangById(
    id: string,
    payload: SpmiUnitPenunjangPayload
  ): Promise<SpmiUnitPenunjang> {
    const response: AxiosResponse<ResponseApi<SpmiUnitPenunjang>> = await Axios(
      {
        method: "PUT",
        url: `/api/unit-penunjang/${id}/?back_office?`,
        data: payload,
        params: { id },
      }
    );
    return response.data.data;
  },
  async createUnitPenunjang(
    payload: SpmiUnitPenunjangPayload
  ): Promise<SpmiUnitPenunjang> {
    const response: AxiosResponse<ResponseApi<SpmiUnitPenunjang>> = await Axios(
      {
        method: "POST",
        url: "/api/unit-penunjang/?back_office",
        data: payload,
      }
    );
    return response.data.data;
  },
};
