import Axios from "../axios";
import { AxiosResponse } from "axios";
import { ResponseApi } from "../types/response";
import { SpmiFakultas } from "../types/spmi.fakultas";
import { SpmiServiceProps } from "./service.spmi.nilai-mutu";

export const SpmiFakultasService = {
  async getListFakultas(
    params?: SpmiServiceProps
  ): Promise<ResponseApi<SpmiFakultas[]>> {
    let url = `/api/fakultas/?back_office&no_page`;
    if (params?.search !== undefined) {
      url += `&search=${params.search}`;
    }
    const response: AxiosResponse<ResponseApi<SpmiFakultas[]>> = await Axios({
      method: "GET",
      url: url,
    });
    return response.data;
  },
  async getFakultasById(id: string): Promise<SpmiFakultas> {
    const response: AxiosResponse<ResponseApi<SpmiFakultas>> = await Axios({
      method: "GET",
      url: "/api/fakultas/?back_office",
      params: { id },
    });

    return response.data.data;
  },
  async createFakultas(payload: Partial<SpmiFakultas>): Promise<SpmiFakultas> {
    const response: AxiosResponse<ResponseApi<SpmiFakultas>> = await Axios({
      method: "POST",
      url: `/api/fakultas/?back_office?`,
      data: payload,
    });
    return response.data.data;
  },
  async updateFakultasById(
    id: string,
    payload: Partial<SpmiFakultas>
  ): Promise<SpmiFakultas> {
    const response: AxiosResponse<ResponseApi<SpmiFakultas>> = await Axios({
      method: "PUT",
      url: `/api/fakultas/${id}/?back_office?`,
      data: payload,
      params: { id },
    });
    return response.data.data;
  },
};
