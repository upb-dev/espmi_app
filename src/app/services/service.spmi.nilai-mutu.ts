import Axios from "../axios";
import { AxiosResponse } from "axios";
import { SpmiNilaiMutu, SpmiNilaiMutuPayload } from "../types/spmi.nilai-mutu";
import { ResponseApi } from "../types/response";

export interface SpmiServiceProps {
    tahun?: number;
    lembaga?: string;
    search?: string
}

export const SpmiNilaiMutuService = {
    async getListNilaiMutu(params?: SpmiServiceProps): Promise<ResponseApi<SpmiNilaiMutu[]>> {
        let url = `/api/nilai-mutu/?back_office&no_page`

        if (params?.tahun !== undefined) {
            url += `&tahun=${params?.tahun}`
        }

        if (params?.lembaga !== undefined) {
            url += `&lembaga=${params?.lembaga}`

        }
        if (params?.search !== undefined) {
            url += `&search=${params?.search}`
        }

        const response: AxiosResponse<ResponseApi<SpmiNilaiMutu[]>> = await Axios({
            method: "GET",
            url: url,

        });
        return response.data;
    },

    async getNilaiMutuById(id: string): Promise<SpmiNilaiMutu> {
        const response: AxiosResponse<ResponseApi<SpmiNilaiMutu>> = await Axios({
            method: "GET",
            url: "/api/nilai-mutu/?back_office",
            params: { id }
        })
        return response.data.data
    },

    async updateNilaiMutuById(id: string, payload: Partial<SpmiNilaiMutu>): Promise<SpmiNilaiMutu> {
        const response: AxiosResponse<ResponseApi<SpmiNilaiMutu>> = await Axios({
            method: "PUT",
            data: payload,
            params: { id }
        })
        return response.data.data
    },
    async createNilaiMutu(payload: SpmiNilaiMutuPayload): Promise<SpmiNilaiMutu> {
        const response: AxiosResponse<ResponseApi<SpmiNilaiMutu>> = await Axios({
            method: "POST",
            data: payload,

        })
        return response.data.data
    },
    async deleteNilaiMutu(id: string): Promise<SpmiNilaiMutu> {
        const response: AxiosResponse<ResponseApi<SpmiNilaiMutu>> = await Axios({
            method: "DELETE",
            params: { id }
        })
        return response.data.data
    }
};