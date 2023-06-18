import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { SpmiNilaiMutu, SpmiNilaiMutuDataTable, SpmiNilaiMutuPayload } from '../types/spmi.nilai-mutu'
import { SpmiNilaiMutuService, SpmiServiceProps } from '../services/service.spmi.nilai-mutu';
import { ResponseApi } from '../types/response';

type SpmiNilaiMutuState = {
    loading: boolean;
    error: boolean;
    spmiNilaiMutu?: SpmiNilaiMutu;
    spmiNilaiMutuDataTable: SpmiNilaiMutuDataTable[];
    listSpmiNilaiMutu: ResponseApi<SpmiNilaiMutu[]> | null;
    getListNilaiMutu: (props?: SpmiServiceProps) => Promise<void>;
    setDataTable: (data: SpmiNilaiMutu[]) => void
}

export const spmiNilaiMutuStore = create<SpmiNilaiMutuState>()(
    devtools((set) => ({
        loading: false,
        error: false,
        spmiNilaiMutu: undefined,
        listSpmiNilaiMutu: null,
        spmiNilaiMutuDataTable: [],
        getListNilaiMutu: async (props?: SpmiServiceProps): Promise<void> => {
            const returnData: SpmiNilaiMutuDataTable[] = []
            try {
                set((prevState) => ({
                    ...prevState,
                    loading: true
                }), false, "get list nilai mutu")
                const result = await SpmiNilaiMutuService.getListNilaiMutu(props)
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
                    loading: false,
                    error: true,
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
    }))
)

type NilaiMutuActivityState = {
    activity: "edit" | "add" | "reset",
    initialValue: SpmiNilaiMutuPayload;
    setActivity: (activity: string, data?: SpmiNilaiMutu) => void
}

export const spmiNilaiMutuActivity = create<NilaiMutuActivityState>()(
    devtools((set) => ({
        activity: 'add',
        initialValue: {
            desc: null,
            lembaga_id: null,
            nilai_mutu: null,
            tahun_id: null
        },
        setActivity: (activity: string, data?: SpmiNilaiMutu) => {
            switch (activity) {
                case "add":
                    set((state) => ({
                        activity: activity,
                        initialValue: {
                            desc: '',
                            lembaga_id: null,
                            nilai_mutu: 0,
                            tahun_id: null
                        },
                    }))
                    break
                case "edit":
                    set((state) => ({
                        activity: activity,
                        initialValue: {
                            desc: data!.desc,
                            lembaga_id: data!.lembaga_akreditasi_data.id,
                            nilai_mutu: data!.nilai_mutu,
                            tahun_id: data!.tahun_data.id
                        },
                    }))
                    break
                case "reset":
                    set((state) => ({
                        activity: activity,
                        initialValue: {
                            desc: '',
                            lembaga_id: null,
                            nilai_mutu: 0,
                            tahun_id: null
                        },
                    }))
                    break
                default:
                    set((state) => ({
                        ...state
                    }))
            }
        }
    }))
)