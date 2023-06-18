import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { SpmiLembagaAkreditasi } from '../types/spmi.lembaga-akreditasi'
import { SpmiLembagaAkreditasiService } from '../services/service.spmi.lembaga-akreditasi'


type SpmiLembagaAkreditasiState = {
    loading: boolean;
    error: boolean;
    lembagaAkreditasi?: SpmiLembagaAkreditasi;
    listLembagaAkreditasi: SpmiLembagaAkreditasi[];
    getLembagaAkreditasi: () => Promise<void>
}

export const spmiLembagaAkreditasiStore = create<SpmiLembagaAkreditasiState>()(
    devtools((set) => ({
        loading: false,
        error: false,
        lembagaAkreditasi: undefined,
        listLembagaAkreditasi: [],
        getLembagaAkreditasi: async (): Promise<void> => {
            try {
                set((prevState) => ({
                    ...prevState,
                    loading: true
                }), false, "get list lembaga akreditasi")
                const response = await SpmiLembagaAkreditasiService.getListLembagaAkreditasi()
                set((state) => ({
                    ...state,
                    listLembagaAkreditasi: response
                }), false, "set lembaga akreditasi")
            } catch (error) {
                set((prevState) => ({
                    ...prevState,
                    loading: false,
                    error: true,
                }), false, "error get list lembaga akreditasi")
                throw error

            } finally {
                set((prevState) => ({
                    ...prevState,
                    loading: false
                }), false, "success get lembaga akrediatsi")
            }
        }
    }))
)