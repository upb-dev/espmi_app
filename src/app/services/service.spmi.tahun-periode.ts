import Axios from "../axios";
import { AxiosResponse } from "axios";
import { SpmiTahunPeriode } from "../models/spmi.tahun-periode";
import { ResponseApi } from "../models/response";

export const SpmiTahunPeriodeService = {
    async getListTahunPeriode(): Promise<ResponseApi<SpmiTahunPeriode[]>> {
        const response: AxiosResponse<ResponseApi<SpmiTahunPeriode[]>> = await Axios({
            method: "GET",
            url: '/api/tahun-periode/?back_office&no_page'
        })
        return response.data
    },
    async getTahunPeriodeById(id: string): Promise<SpmiTahunPeriode> {
        const response: AxiosResponse<ResponseApi<SpmiTahunPeriode>> = await Axios({
            method: "GET",
            url: "/api/tahun-periode/?back_office",
            params: { id }
        })

        return response.data.data
    },
    async updateTahunPeriodeById(id: string, payload: Partial<SpmiTahunPeriode>): Promise<SpmiTahunPeriode> {
        const response: AxiosResponse<ResponseApi<SpmiTahunPeriode>> = await Axios({
            method: "PUT",
            data: payload,
            params: { id }
        })
        return response.data.data
    },
}