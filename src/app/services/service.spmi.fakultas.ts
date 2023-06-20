import Axios from "../axios";
import { AxiosResponse } from "axios";
import { ResponseApi } from "../types/response";
import { SpmiFakultas } from "../types/spmi.fakultas";

export const SpmiFakultasService = {
  async getListFakultas(): Promise<ResponseApi<SpmiFakultas[]>> {
    const response: AxiosResponse<ResponseApi<SpmiFakultas[]>> = await Axios({
      method: "GET",
      url: "/api/fakultas/?back_office&no_page",
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
