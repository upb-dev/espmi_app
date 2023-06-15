import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Icon,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { spmiNilaiMutuStore } from "../../../stores/store.spmi.nilai-mutu";
import { spmiTahunPeriodeStore } from "../../../stores/store.spmi.tahun-periode";
import Breadcrumb from "../../../components/Breadcrumb";
import SimpleCard from "../../../components/SimpleCard";

import { useEffect, useState } from "react";
import ItLoading from "../../../components/ItLoading";
import { Alert } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { SpmiTahunPeriode } from "../../../models/spmi.tahun-periode";
//   import FormDialog from "./FormDialog";
//   import { ToastContainer } from "react-toastify";
//   import "react-toastify/dist/ReactToastify.css";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const HeaderContainer = styled(Box)(() => ({
  paddingBottom: 16,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const NilaiMutuPage = () => {
  const {
    loading: loading_nilai_mutu,
    error: error_nilai_mutu,
    listSpmiNilaiMutu,
    spmiNilaiMutuDataTable,
    getListNilaiMutu,
  } = spmiNilaiMutuStore();
  const {
    loading: loading_tahun,
    error: error_tahun,
    listTahunPeriode,
    getListTahunPeriode,
  } = spmiTahunPeriodeStore();
  const [selectedTahun, setSelectedTahun] = useState<SpmiTahunPeriode | null>(
    null
  );
  // const [edit, setEdit] = useState(null);
  // const [loadingForm, setLoadingForm] = useState(false);

  //   const dispatch = useDispatch();

  //   function handleClickOpen() {
  //     dispatch(addProject());
  //     setEdit(null);
  //   }

  //   function handleClose() {
  //     dispatch(resetState());
  //   }

  //   useEffect(() => {
  //     dispatch(getProjectList(page + 1, rowsPerPage));
  //   }, [dispatch, page, rowsPerPage]);

  //   const projectList = useSelector((state) => state.project.projectList);
  //   const { loading, projects, totalItems, error } = projectList;

  //   const projectActivity = useSelector((state) => state.project.projectActivity);
  //   const { open, initialValues } = projectActivity;

  //   const handleEdit = (id) => {
  //     dispatch(editProject(id));
  //     setEdit(id);
  //   };
  const columns: GridColDef[] = [
    { field: "id", headerName: "No", width: 70 },
    {
      field: "nilai_mutu",
      headerName: "Nilai Mutu",
      type: "number",
      width: 200,
    },
    { field: "desc", headerName: "Deskripsi", width: 400 },
    {
      field: "tahun",
      headerName: "Tahun",
      type: "string",
      width: 200,
    },
    {
      field: "lembaga_akreditasi",
      headerName: "Lembaga Akreditasi",
      type: "string",
      width: 400,
    },
  ];
  useEffect(() => {
    getListNilaiMutu();
    getListTahunPeriode();
  }, []);

  return (
    <div>
      <Container>
        <HeaderContainer>
          <Box className="breadcrumb">
            <Breadcrumb
              routeSegments={[
                { name: "Nilai Mutu", path: "/nilai-mutu" },
                { name: "List Nilai Mutu" },
              ]}
            />
          </Box>
          {/* <Box display="flex">
            <FormDialog
              id={edit}
              loading={loadingForm}
              setLoadingForm={setLoadingForm}
              initialValues={initialValues}
              handleClose={handleClose}
              handleClickOpen={handleClickOpen}
              open={open ?? false}
              edit={edit}
            />
          </Box> */}
        </HeaderContainer>
        <Box margin={2}>
          <Card elevation={2}>
            <CardContent>
              <Stack columnGap={2} spacing={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Icon>filter_list</Icon>{" "}
                  <Typography>Filter Data Nilai Mutu</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Autocomplete
                    value={selectedTahun}
                    onChange={(_: any, newValue: SpmiTahunPeriode | null) => {
                      setSelectedTahun(newValue);
                    }}
                    id="filter-tahun-periode"
                    options={listTahunPeriode!}
                    getOptionLabel={(option: SpmiTahunPeriode) =>
                      option.tahun.toString()
                    }
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Tahun Periode" />
                    )}
                  />
                  <Autocomplete
                    value={selectedTahun}
                    onChange={(_: any, newValue: SpmiTahunPeriode | null) => {
                      setSelectedTahun(newValue);
                    }}
                    id="filter-lembaga-akreditasi"
                    options={listTahunPeriode!}
                    getOptionLabel={(option: SpmiTahunPeriode) =>
                      option.tahun.toString()
                    }
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Lembaga Akreditasi" />
                    )}
                  />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Box>
        {loading_nilai_mutu || loading_tahun ? (
          <ItLoading />
        ) : error_nilai_mutu || error_tahun ? (
          <Alert sx={{ m: 1 }} severity="error" variant="filled">
            {error_nilai_mutu || error_tahun}
          </Alert>
        ) : listSpmiNilaiMutu !== null ? (
          <SimpleCard title="Daftar Penilaian Mutu">
            <div style={{ height: "100%", width: "100%" }}>
              <DataGrid
                rows={spmiNilaiMutuDataTable}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            </div>
          </SimpleCard>
        ) : (
          <ItLoading />
        )}
      </Container>

      {/* <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      /> */}
    </div>
  );
};

export default NilaiMutuPage;
