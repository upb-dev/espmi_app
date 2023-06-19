import { Box, styled } from "@mui/material";
import Breadcrumb, { RouteSegment } from "../../../components/Breadcrumb";
import { spmiTahunPeriodeStore } from "../../../stores/store.spmi.tahun-periode";
import RootPage from "../../RootPage";

const PeriodePage = () => {
  // const {
  //   loading: loading_tahun,
  //   error: error_tahun,
  //   listTahunPeriode,
  //   getListTahunPeriode,
  // } = spmiTahunPeriodeStore();

  // const columns: GridColDef[] = [
  //   { field: "id", headerName: "No", width: 70 },
  //   {
  //     field: "nilai_mutu",
  //     headerName: "Nilai Mutu",
  //     type: "number",
  //     width: 150,
  //   },
  //   { field: "desc", headerName: "Deskripsi", width: 200 },
  //   {
  //     field: "tahun",
  //     headerName: "Tahun",
  //     type: "string",
  //     width: 150,
  //   },
  //   {
  //     field: "lembaga_akreditasi",
  //     headerName: "Lembaga Akreditasi",
  //     type: "string",
  //     width: 150,
  //   },
  // ];
  const routeSegments: RouteSegment[] = [
    { name: "Periode", path: "/periode" },
    { name: "List Periode" },
  ];
  return <RootPage routeSegments={routeSegments}>ini halaman periode</RootPage>;
};

export default PeriodePage;
