import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { SpmiNilaiMutu } from '../models/spmi.nilai-mutu'
import { SpmiNilaiMutuService } from '../services/service.spmi.nilai-mutu';
import { ResponsePaginate } from '../models/response';

type SpmiNilaiMutuState = {
    loading: boolean;
    spmiNilaiMutu?: SpmiNilaiMutu;
    listSpmiNilaiMutu: ResponsePaginate<SpmiNilaiMutu[]> | null;
    getListNilaiMutu: () => Promise<void>;
}

export const spmiNilaiMutuStore = create<SpmiNilaiMutuState>()(
    devtools((set) => (
        {
            loading: false,

            spmiNilaiMutu: undefined,
            listSpmiNilaiMutu: null,
            getListNilaiMutu: async (): Promise<void> => {
                try {
                    set((prevState) => ({
                        ...prevState,
                        loading: true
                    }), false, "get list nilai mutu")
                    const result = await SpmiNilaiMutuService.getListNilaiMutu()
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