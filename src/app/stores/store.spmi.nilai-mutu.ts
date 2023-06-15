import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { SpmiNilaiMutu } from '../models/spmi.nilai-mutu'
import { SpmiNilaiMutuService } from '../services/service.spmi.nilai-mutu';
import { ResponsePaginate } from '../models/response';

type SpmiNilaiMutuState = {
    loading: boolean;
    error: boolean;
    spmiNilaiMutu?: SpmiNilaiMutu;
    listSpmiNilaiMutu: ResponsePaginate<SpmiNilaiMutu> | null;
    getListNilaiMutu: (page: number, size: number) => Promise<void>;
}

export const spmiNilaiMutuStore = create<SpmiNilaiMutuState>()(
    devtools((set) => (
        {
            loading: false,
            error: false,
            spmiNilaiMutu: undefined,
            listSpmiNilaiMutu: null,
            getListNilaiMutu: async (page: number, size: number): Promise<void> => {
                try {
                    set((prevState) => ({
                        ...prevState,
                        loading: true
                    }), false, "get list nilai mutu")
                    const result = await SpmiNilaiMutuService.getListNilaiMutu(page, size)
                    set((prevState) => ({
                        ...prevState,
                        listSpmiNilaiMutu: result
                    }), false, "getting list nilai mutu success")
                } catch (error) {
                    set((prevState) => ({
                        ...prevState,
                        loading: false
                    }), false, "gagal get list nilai mutu")
                    throw error
                } finally {
                    set((prevState) => ({
                        ...prevState,
                        loading: false
                    }), false, "get list nilai mutu finish")
                }
            }
        }
    ))
)