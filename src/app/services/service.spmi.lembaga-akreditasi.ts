import Axios from "../axios";
import { AxiosResponse } from "axios";
import { SpmiLembagaAkreditasi } from "../types/spmi.lembaga-akreditasi";
import { ResponseApi } from "../types/response";

export const SpmiLembagaAkreditasiService = {
    async getListLembagaAkreditasi(): Promise<SpmiLembagaAkreditasi[]> {
        const response: AxiosResponse<ResponseApi<SpmiLembagaAkreditasi[]>> = await Axios({
            method: "GET",
            url: "/api/lembaga-akreditasi/?back_office&no_page"
        })
        return response.data.data
    },
    async getLembagaAkreditasiById(id: string): Promise<ResponseApi<SpmiLembagaAkreditasi>> {
        const response: AxiosResponse<ResponseApi<SpmiLembagaAkreditasi>> = await Axios({
            method: "GET",
            url: "/api/lembaga-akrediatasi/?back_office",
            params: { id }
        })
        return response.data
    }
}
