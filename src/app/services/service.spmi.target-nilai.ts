import Axios from "../axios";
import { AxiosResponse } from "axios";
import { ResponseApi } from "../types/response";
import {
  SpmiTargetNilai,
  SpmiTargetNilaiPayload,
} from "../types/spmi.target-nilai";
import { SpmiServiceProps } from "./service.spmi.nilai-mutu";

export const SpmiTargetNilaiService = {
  async getListTargetNilai(
    params?: SpmiServiceProps
  ): Promise<ResponseApi<SpmiTargetNilai[]>> {
    let url = `/api/target-nilai-mutu/?back_office&no_page`;
    if (params?.tahun !== undefined) {
      url += `&tahun=${params?.tahun}`;
    }

    if (params?.lembaga !== undefined) {
      url += `&lembaga=${params?.lembaga}`;
    }
    if (params?.search !== undefined) {
      url += `&search=${params?.search}`;
    }

    const response: AxiosResponse<ResponseApi<SpmiTargetNilai[]>> = await Axios(
      {
        method: "GET",
        url: url,
      }
    );
    return response.data;
  },
  async getTargetNilaiById(id: string): Promise<SpmiTargetNilai> {
    const response: AxiosResponse<ResponseApi<SpmiTargetNilai>> = await Axios({
      method: "GET",
      url: "/api/target-nilai-mutu/?back_office",
      params: { id },
    });

    return response.data.data;
  },
  async updateTargetNilaiById(
    id: string,
    payload: SpmiTargetNilaiPayload
  ): Promise<SpmiTargetNilai> {
    const response: AxiosResponse<ResponseApi<SpmiTargetNilai>> = await Axios({
      method: "PUT",
      url: `/api/target-nilai-mutu/${id}/?back_office?`,
      data: payload,
      params: { id },
    });
    return response.data.data;
  },
  async createTargetNilai(
    payload: SpmiTargetNilaiPayload
  ): Promise<SpmiTargetNilai> {
    const response: AxiosResponse<ResponseApi<SpmiTargetNilai>> = await Axios({
      method: "POST",
      url: "/api/target-nilai-mutu/?back_office",
      data: payload,
    });
    return response.data.data;
  },
};
