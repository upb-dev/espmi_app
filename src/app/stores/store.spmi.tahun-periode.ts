import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { SpmiTahunPeriode } from '../models/spmi.tahun-periode';
import { SpmiTahunPeriodeService } from '../services/service.spmi.tahun-periode';


type SpmiTahunPeriodeStore = {
    loading: boolean;
    error: boolean;
    tahunPeriode?: SpmiTahunPeriode;
    listTahunPeriode: SpmiTahunPeriode[] | null;
    // spmiTahunPeriodeDataTable
    getListTahunPeriode: () => Promise<void>
}

export const spmiTahunPeriodeStore = create<SpmiTahunPeriodeStore>()(
    devtools((set) => (
        {
            loading: false,
            error: false,
            tahunPeriode: undefined,
            listTahunPeriode: [],
            getListTahunPeriode: async (): Promise<void> => {
                try {
                    set((prevState) => ({
                        ...prevState,
                        loading: true
                    }), false, "get list tahun periode")
                    const response = await SpmiTahunPeriodeService.getListTahunPeriode()
                    set((state) => ({
                        ...state,
                        listTahunPeriode: response.data
                    }))
                } catch (error) {
                    set((prevState) => ({
                        ...prevState,
                        loading: false
                    }), false, "error get list tahun periode")
                    throw error
                } finally {
                    set((prevState) => ({
                        ...prevState,
                        loading: false
                    }), false, "success get tahun periode")
                }
            }
        }
    ))
)