import Axios from "../axios";
import { AxiosResponse } from "axios";
import { ResponseApi } from "../types/response";
import { SpmiAuditor, SpmiAuditorPayload } from "../types/spmi.auditor";
import { SpmiServiceProps } from "./service.spmi.nilai-mutu";

export const SpmiAuditorService = {
  async getListAuditor(
    params?: SpmiServiceProps
  ): Promise<ResponseApi<SpmiAuditor[]>> {
    let url = `/api/auditor/?back_office&no_page`;

    if (params?.search !== undefined) {
      url += `&search=${params?.search}`;
    }

    const response: AxiosResponse<ResponseApi<SpmiAuditor[]>> = await Axios({
      method: "GET",
      url: url,
    });
    return response.data;
  },
  async getAuditorById(id: string): Promise<SpmiAuditor> {
    const response: AxiosResponse<ResponseApi<SpmiAuditor>> = await Axios({
      method: "GET",
      url: "/api/auditor/?back_office",
      params: { id },
    });

    return response.data.data;
  },
  async updateAuditorById(
    id: string,
    payload: SpmiAuditorPayload
  ): Promise<SpmiAuditor> {
    const response: AxiosResponse<ResponseApi<SpmiAuditor>> = await Axios({
      method: "PUT",
      url: `/api/auditor/${id}/?back_office?`,
      data: payload,
      params: { id },
    });
    return response.data.data;
  },
  async createAuditor(payload: SpmiAuditorPayload): Promise<SpmiAuditor> {
    const response: AxiosResponse<ResponseApi<SpmiAuditor>> = await Axios({
      method: "POST",
      url: "/api/auditor/?back_office",
      data: payload,
    });
    return response.data.data;
  },
};
