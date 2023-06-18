import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Grid,
  Icon,
  IconButton,
  InputBase,
  Paper,
  Stack,
  TextField,
  Typography,
  styled,
  Button,
} from "@mui/material";
import {
  spmiNilaiMutuActivity,
  spmiNilaiMutuStore,
} from "../../../stores/store.spmi.nilai-mutu";
import { spmiTahunPeriodeStore } from "../../../stores/store.spmi.tahun-periode";
import Breadcrumb from "../../../components/Breadcrumb";
import SimpleCard from "../../../components/SimpleCard";

import { useEffect, useState } from "react";
import ItLoading from "../../../components/ItLoading";
import { Alert } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { SpmiTahunPeriode } from "../../../types/spmi.tahun-periode";
import SearchIcon from "@mui/icons-material/Search";
import { spmiLembagaAkreditasiStore } from "../../../stores/store.spmi.lembaga-akrediatasi";
import { SpmiLembagaAkreditasi } from "../../../types/spmi.lembaga-akreditasi";
import FormNilaiMutu from "./FormNilaiMutu";
import { SpmiServiceProps } from "../../../services/service.spmi.nilai-mutu";
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

  const {
    loading: loading_lembaga,
    error: error_lembaga,
    listLembagaAkreditasi,
    getLembagaAkreditasi,
  } = spmiLembagaAkreditasiStore();
  const [selectedTahun, setSelectedTahun] = useState<SpmiTahunPeriode | null>(
    null
  );
  const { initialValue, setActivity } = spmiNilaiMutuActivity();
  const [selectedLembaga, setSelectedLembaga] =
    useState<SpmiLembagaAkreditasi | null>(null);
  const [edit, setEdit] = useState<string | null>(null);
  const [loadingForm, setLoadingForm] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [param, setParam] = useState<SpmiServiceProps>({});

  function handleSearch() {
    const updatedParam: SpmiServiceProps = { ...param }; // Membuat salinan objek param

    if (search !== "") {
      updatedParam.search = search;
    } else {
      updatedParam.search = undefined;
    }

    setParam(updatedParam);
  }

  function handleFilterTahun(value: SpmiTahunPeriode | null) {
    const updatedParam: SpmiServiceProps = { ...param }; // Membuat salinan objek param
    setSelectedTahun(value);
    if (value !== null) {
      updatedParam.tahun = value.tahun;
    } else {
      updatedParam.tahun = undefined;
    }
    setParam(updatedParam);
    // getListNilaiMutu(param);
  }

  function handleFilterLembaga(value: SpmiLembagaAkreditasi | null) {
    const updatedParam: SpmiServiceProps = { ...param }; // Membuat salinan objek param
    setSelectedLembaga(value);
    if (value !== null) {
      updatedParam.lembaga = value.name;
    } else {
      updatedParam.lembaga = undefined;
    }
    console.log("update", updatedParam);
    setParam(updatedParam);
    // getListNilaiMutu(param);
  }

  //   const dispatch = useDispatch();

  function handleClickOpen() {
    setOpen(true);
    setActivity("add");
    setEdit(null);
  }

  function handleClose() {
    setActivity("reset");
    setOpen(false);
    getListNilaiMutu();
  }

  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);

  const handleRowClick = (params: any) => {
    const { id } = params;
    let newSelectedRowIds: number[];

    if (selectedRowIds.includes(id)) {
      // Deselect row if it's already selected
      newSelectedRowIds = selectedRowIds.filter((rowId) => rowId !== id);
    } else {
      // Select row if it's not already selected
      newSelectedRowIds = [...selectedRowIds, id];
    }

    setSelectedRowIds(newSelectedRowIds);
  };

  const isCellEditable = (params: any) => {
    return !selectedRowIds.includes(params.row.id);
  };

  const handleDelete = () => {
    // Handle delete action for selectedRow
    // Perform the desired delete action
    console.log("Delete selected row:", selectedRowIds);
  };

  const deleteButtonDisabled = selectedRowIds.length === 0;
  const columns: GridColDef[] = [
    { field: "id", headerName: "No", width: 70 },
    {
      field: "nilai_mutu",
      headerName: "Nilai Mutu",
      type: "number",
      width: 150,
    },
    { field: "desc", headerName: "Deskripsi", width: 200 },
    {
      field: "tahun",
      headerName: "Tahun",
      type: "string",
      width: 150,
    },
    {
      field: "lembaga_akreditasi",
      headerName: "Lembaga Akreditasi",
      type: "string",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        const handleDelete = () => {
          const id = params.id;
          // Lakukan aksi penghapusan dengan menggunakan ID
          console.log(`Delete row with ID ${id}`);
        };

        return (
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            onClick={handleDelete}
          >
            Update
          </Button>
        );
      },
    },
  ];
  useEffect(() => {
    getListNilaiMutu();
    getListTahunPeriode();
    getLembagaAkreditasi();
  }, []);

  useEffect(() => {
    getListNilaiMutu(param);
  }, [param]);

  console.log(param);
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
          <Box display="flex">
            <FormNilaiMutu
              id={edit}
              loading={loadingForm}
              setLoadingForm={setLoadingForm}
              initialValues={initialValue}
              handleClose={handleClose}
              handleClickOpen={handleClickOpen}
              listLembagaAkreditasi={listLembagaAkreditasi}
              listTahunPeriode={listTahunPeriode}
              open={open}
              // edit={edit}
            />
          </Box>
        </HeaderContainer>
        <Box paddingBottom={2}>
          <Card elevation={2}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item sm={6}>
                  <Stack columnGap={2} spacing={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Icon>filter_list</Icon>
                      <Typography>Filter Data Nilai Mutu</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      <Autocomplete
                        // isOptionEqualToValue={useCallback((option, value) => option.value === value.value, [])}
                        value={selectedTahun}
                        onChange={(
                          _: any,
                          newValue: SpmiTahunPeriode | null
                        ) => {
                          handleFilterTahun(newValue);
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
                        value={selectedLembaga}
                        onChange={(
                          _: any,
                          newValue: SpmiLembagaAkreditasi | null
                        ) => {
                          handleFilterLembaga(newValue);
                        }}
                        id="filter-lembaga-akreditasi"
                        options={listLembagaAkreditasi!}
                        getOptionLabel={(option: SpmiLembagaAkreditasi) =>
                          option.name
                        }
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField {...params} label="Lembaga Akreditasi" />
                        )}
                      />
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item sm={6}>
                  <Stack
                    columnGap={2}
                    spacing={2}
                    justifyContent="space-between"
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      justifyContent="end"
                    >
                      <Icon>settings</Icon>
                      <Typography>Aksi</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="end">
                      <Paper
                        component="form"
                        sx={{
                          p: "2px 4px",
                          display: "flex",
                          alignItems: "center",
                          width: 300,
                        }}
                      >
                        <InputBase
                          sx={{ ml: 1, flex: 1 }}
                          value={search}
                          onChange={(event) => setSearch(event.target.value)}
                          placeholder="Cari Nilai Mutu"
                          inputProps={{ "aria-label": "cari nilai mutu" }}
                        />
                        <IconButton
                          type="button"
                          sx={{ p: "10px" }}
                          aria-label="search"
                          onClick={handleSearch}
                        >
                          <SearchIcon />
                        </IconButton>
                      </Paper>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleDelete}
                        disabled={deleteButtonDisabled}
                      >
                        Delete
                      </Button>
                      {/* <Button variant="contained" onClick={handleClickOpen}>
                        <Icon>add</Icon> Tambah Nilai Mutu
                      </Button> */}
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
        {loading_nilai_mutu || loading_tahun || loading_lembaga ? (
          <ItLoading />
        ) : error_nilai_mutu || error_tahun || error_lembaga ? (
          <Alert sx={{ m: 1 }} severity="error" variant="filled">
            {error_nilai_mutu || error_tahun || error_lembaga}
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
                pageSizeOptions={[5, 10, 15, 20]}
                checkboxSelection={true}
                onRowClick={handleRowClick}
                isRowSelectable={isCellEditable}
                rowSelectionModel={selectedRowIds}

                // rowch
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
