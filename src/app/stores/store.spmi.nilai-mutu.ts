import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { SpmiNilaiMutu, SpmiNilaiMutuDataTable } from '../models/spmi.nilai-mutu'
import { SpmiNilaiMutuService } from '../services/service.spmi.nilai-mutu';
import { ResponseApi } from '../models/response';

type SpmiNilaiMutuState = {
    loading: boolean;
    error: boolean;
    spmiNilaiMutu?: SpmiNilaiMutu;
    spmiNilaiMutuDataTable: SpmiNilaiMutuDataTable[];
    listSpmiNilaiMutu: ResponseApi<SpmiNilaiMutu[]> | null;
    getListNilaiMutu: () => Promise<void>;
    setDataTable: (data: SpmiNilaiMutu[]) => void
}

export const spmiNilaiMutuStore = create<SpmiNilaiMutuState>()(
    devtools((set) => (
        {
            loading: false,
            error: false,
            spmiNilaiMutu: undefined,
            listSpmiNilaiMutu: null,
            spmiNilaiMutuDataTable: [],
            getListNilaiMutu: async (): Promise<void> => {
                const returnData: SpmiNilaiMutuDataTable[] = []
                try {
                    set((prevState) => ({
                        ...prevState,
                        loading: true
                    }), false, "get list nilai mutu")
                    const result = await SpmiNilaiMutuService.getListNilaiMutu()
                    set((prevState) => ({
                        ...prevState,
                        listSpmiNilaiMutu: result
                    }), false, "getting list nilai mutu success"),
                        result.data.map((nilaiMutu: SpmiNilaiMutu, i: number) => {
                            returnData.push(
                                {
                                    id: i + 1,
                                    nilai_mutu: nilaiMutu.nilai_mutu,
                                    desc: nilaiMutu.desc,
                                    tahun: nilaiMutu.tahun_data.tahun,
                                    lembaga_akreditasi: nilaiMutu.lembaga_akreditasi_data.name
                                }
                            )

                        });
                    set((prevState) => ({
                        ...prevState,
                        spmiNilaiMutuDataTable: returnData
                    }), false, "set data table")
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
            },
            setDataTable: (data: SpmiNilaiMutu[]) => {
                const result: SpmiNilaiMutuDataTable[] = []
                try {
                    data.map((nilaiMutu: SpmiNilaiMutu, i: number) => {
                        result.push(
                            {
                                id: i + 1,
                                nilai_mutu: nilaiMutu.nilai_mutu,
                                desc: nilaiMutu.desc,
                                tahun: nilaiMutu.tahun_data.tahun,
                                lembaga_akreditasi: nilaiMutu.lembaga_akreditasi_data.name
                            }
                        )

                    });
                    set((prevStatet) => ({
                        ...prevStatet,
                        spmiNilaiMutuDataTable: result
                    }), false, "set data table")
                } catch (error) {
                    throw error
                }
            }

        }

    ))

)