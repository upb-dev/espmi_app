import Axios from "../axios";
import { AxiosResponse } from "axios";
import { SpmiNilaiMutu } from "../models/spmi.nilai-mutu";
import { ResponseApi, ResponsePaginate } from "../models/response";


export const SpmiNilaiMutuService = {
    async getListNilaiMutu(): Promise<ResponsePaginate<SpmiNilaiMutu[]>> {
        const response: AxiosResponse<ResponseApi<ResponsePaginate<SpmiNilaiMutu[]>>> = await Axios({
            method: "GET",
            url: "/api/nilai-mutu/?back_office",

        });
        return response.data.data;
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

    async deleteNilaiMutu(id: string): Promise<SpmiNilaiMutu> {
        const response: AxiosResponse<ResponseApi<SpmiNilaiMutu>> = await Axios({
            method: "DELETE",
            params: { id }
        })
        return response.data.data
    }
};