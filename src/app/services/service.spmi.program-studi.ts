import Axios from "../axios";
import { AxiosResponse } from "axios";
import { ResponseApi } from "../types/response";
import { SpmiProgramStudi } from "../types/spmi.program-studi";

export const SpmiProgramStudiService = {
  async getListProgramStudi(): Promise<ResponseApi<SpmiProgramStudi[]>> {
    const response: AxiosResponse<ResponseApi<SpmiProgramStudi[]>> =
      await Axios({
        method: "GET",
        url: "/api/program-studi/?back_office&no_page",
      });
    return response.data;
  },
  async getProgramStudiById(id: string): Promise<SpmiProgramStudi> {
    const response: AxiosResponse<ResponseApi<SpmiProgramStudi>> = await Axios({
      method: "GET",
      url: "/api/program-studi/?back_office",
      params: { id },
    });

    return response.data.data;
  },
  async updateProgramStudiById(
    id: string,
    payload: Partial<SpmiProgramStudi>
  ): Promise<SpmiProgramStudi> {
    const response: AxiosResponse<ResponseApi<SpmiProgramStudi>> = await Axios({
      method: "PUT",
      url: `/api/program-studi/${id}/?back_office?`,
      data: payload,
      params: { id },
    });
    return response.data.data;
  },
};
