import { Box, Button, styled } from "@mui/material";
import Breadcrumb, { RouteSegment } from "../../../components/Breadcrumb";
import SimpleCard from "../../../components/SimpleCard";
import {
  SpmiTargetNilaiStore,
  spmiTargetNilaiActivity,
} from "../../../stores/store.spmi.target-nilai";
import { useEffect, useState } from "react";
import { spmiTahunPeriodeStore } from "../../../stores/store.spmi.tahun-periode";
import { spmiLembagaAkreditasiStore } from "../../../stores/store.spmi.lembaga-akrediatasi";
import { SpmiTahunPeriode } from "../../../types/spmi.tahun-periode";
import { SpmiLembagaAkreditasi } from "../../../types/spmi.lembaga-akreditasi";
import { SpmiServiceProps } from "../../../services/service.spmi.nilai-mutu";
import ItLoading from "../../../components/ItLoading";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import FormTargetNilai from "./FormTargetNilai";
import { spmiProgramStudiStore } from "../../../stores/store.spmi.program-studi";
import FilterCard from "../../FilterCard";

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

const TargetNilaiPage = () => {
  const routeSegments: RouteSegment[] = [
    { name: "Target Nilai Mutu", path: "/target-nilai" },
    { name: "List Target Nilai Mutu" },
  ];
  const {
    loading,
    listTargetNilai,
    spmiTargetNilaiDataTable,
    getListTargetNilai,
  } = SpmiTargetNilaiStore();
  const {
    loading: loading_tahun,
    listTahunPeriode,
    getListTahunPeriode,
  } = spmiTahunPeriodeStore();

  const { listProgramStudi, getListProgramStudi } = spmiProgramStudiStore();

  const {
    loading: loading_lembaga,
    listLembagaAkreditasi,
    getLembagaAkreditasi,
  } = spmiLembagaAkreditasiStore();
  const [selectedTahun, setSelectedTahun] = useState<SpmiTahunPeriode | null>(
    null
  );
  const { initialValue, setActivity } = spmiTargetNilaiActivity();
  const [param, setParam] = useState<SpmiServiceProps>({});
  const [edit, setEdit] = useState<string | null>(null);

  const [selectedLembaga, setSelectedLembaga] =
    useState<SpmiLembagaAkreditasi | null>(null);

  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [loadingForm, setLoadingForm] = useState(false);

  function handleClickOpen() {
    setOpen(true);
    setEdit(null);
  }

  function handleClose() {
    setActivity("reset");
    setOpen(false);
    getListTargetNilai();
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
  }

  function handleFilterLembaga(value: SpmiLembagaAkreditasi | null) {
    const updatedParam: SpmiServiceProps = { ...param }; // Membuat salinan objek param
    setSelectedLembaga(value);
    if (value !== null) {
      updatedParam.lembaga = value.name;
    } else {
      updatedParam.lembaga = undefined;
    }
    setParam(updatedParam);
  }
  function handleSearch() {
    const updatedParam: SpmiServiceProps = { ...param }; // Membuat salinan objek param

    if (search !== "") {
      updatedParam.search = search;
    } else {
      updatedParam.search = undefined;
    }

    setParam(updatedParam);
  }
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
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);

  const handleDelete = () => {
    // Handle delete action for selectedRow
    // Perform the desired delete action
    console.log("Delete selected row:", selectedRowIds);
  };
  const deleteButtonDisabled = selectedRowIds.length === 0;
  const isCellEditable = (params: any) => {
    return !selectedRowIds.includes(params.row.id);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "No", width: 70 },
    { field: "program_studi", headerName: "Program Studi", width: 200 },
    {
      field: "target_nilai",
      headerName: "Target Nilai",
      type: "number",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: "right",
      width: 150,
      align: "right",
      renderCell: (params) => {
        const handleUpdate = () => {
          const id = parseInt(params.id.toString());

          const data = listTargetNilai[id - 1];
          // Lakukan aksi penghapusan dengan menggunakan ID
          setActivity("edit", data);
          setOpen(true);
          setEdit(data.id!);
          console.log(`Delete row with ID ${JSON.stringify(data)}`);
        };

        return (
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            onClick={handleUpdate}
          >
            Update
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    getListTargetNilai(param);
    if (listLembagaAkreditasi.length === 0 || listTahunPeriode.length === 0) {
      getListTahunPeriode();
      getLembagaAkreditasi();
      getListProgramStudi();
    }
  }, [param]);
  console.log(param);
  return (
    <Container>
      <HeaderContainer>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={routeSegments} />
        </Box>
        <Box display="flex">
          <FormTargetNilai
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            id={edit}
            initialValues={initialValue}
            listLembagaAkreditasi={listLembagaAkreditasi}
            listProgramStudi={listProgramStudi?.data!}
            listTahunPeriode={listTahunPeriode}
            loading={loadingForm}
            open={open}
            setLoadingForm={setLoadingForm}
          />
        </Box>
      </HeaderContainer>
      <Box paddingBottom={2}>
        <FilterCard
          deleteButtonDisabled={deleteButtonDisabled}
          handleDelete={handleDelete}
          handleFilterLembaga={handleFilterLembaga}
          handleFilterTahun={handleFilterTahun}
          handleSearch={handleSearch}
          listLembagaAkreditasi={listLembagaAkreditasi}
          listTahunPeriode={listTahunPeriode}
          search={search}
          selectedLembaga={selectedLembaga}
          selectedTahun={selectedTahun}
          setSearch={setSearch}
          key={1}
        />
      </Box>
      {loading || loading_lembaga || loading_tahun ? (
        <ItLoading />
      ) : (
        <SimpleCard title="Daftar Target Nilai">
          <div style={{ height: "100%", width: "100%" }}>
            <DataGrid
              columns={columns}
              rows={spmiTargetNilaiDataTable}
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
            />
          </div>
        </SimpleCard>
      )}
    </Container>
  );
};

export default TargetNilaiPage;
