import { styled, Box, Button } from "@mui/material";
import Breadcrumb, { RouteSegment } from "../../components/Breadcrumb";
import {
  SpmiAuditorStore,
  spmiAuditorActivity,
} from "../../stores/store.spmi.auditor";
import ItLoading from "../../components/ItLoading";
import SimpleCard from "../../components/SimpleCard";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import FormAuditor from "./FormAuditor";
import { spmiLembagaAkreditasiStore } from "../../stores/store.spmi.lembaga-akrediatasi";
import { SpmiUnitStore } from "../../stores/store.spmi.unit";

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

const AuditorPage = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "No", width: 70 },
    { field: "nik", headerName: "NIK", type: "string", width: 200 },
    {
      field: "nama_lengkap",
      headerName: "Nama Lengkap",
      type: "string",
      width: 400,
    },
    {
      field: "instansi",
      headerName: "Instansi",
      type: "string",
      width: 300,
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

          const data = listAuditor[id - 1];
          // Lakukan aksi penghapusan dengan menggunakan ID
          //   setActivity("edit", data);
          //   setOpen(true);
          //   setEdit(data.id!);
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
  const routeSegments: RouteSegment[] = [
    { name: "Auditor", path: "/auditor" },
    { name: "List Auditor" },
  ];
  const {
    loading: loading_audior,
    listAuditor,
    spmiAuditorDataTable,
    getListAuditor,
  } = SpmiAuditorStore();

  const { loading: loading_unit, listUnit, getListUnit } = SpmiUnitStore();

  const {
    loading: loading_lembaga,
    listLembagaAkreditasi,
    getLembagaAkreditasi,
  } = spmiLembagaAkreditasiStore();

  const { setActivity, initialValue } = spmiAuditorActivity();

  const [edit, setEdit] = useState<string | null>(null);
  const [loadingForm, setLoadingForm] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  // const [search, setSearch] = useState<string>("");
  // const [param, setParam] = useState<SpmiServiceProps>({});

  function handleClose() {
    setActivity("reset");
    setOpen(false);
    getListAuditor();
  }
  function handleClickOpen() {
    setOpen(true);
    setEdit(null);
  }

  useEffect(() => {
    getListAuditor();
    getLembagaAkreditasi();
    getListUnit();
  }, []);
  return (
    <Container>
      <HeaderContainer>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={routeSegments} />
        </Box>
        <Box display="flex">
          <FormAuditor
            id={edit}
            loading={loadingForm}
            setLoadingForm={setLoadingForm}
            initialValues={initialValue}
            handleClose={handleClose}
            handleClickOpen={handleClickOpen}
            listLembagaAkreditasi={listLembagaAkreditasi}
            listUnit={listUnit}
            open={open}
          />
        </Box>
      </HeaderContainer>
      {loading_audior || loading_unit || loading_lembaga ? (
        <ItLoading />
      ) : (
        <SimpleCard title="Daftar Auditor">
          <div style={{ height: "100%", width: "100%" }}>
            <DataGrid
              columns={columns}
              rows={spmiAuditorDataTable}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10, 15, 20]}
              checkboxSelection={true}
              //   onRowClick={handleRowClick}
              //   isRowSelectable={isCellEditable}
              //   rowSelectionModel={selectedRowIds}
            />
          </div>
        </SimpleCard>
      )}
    </Container>
  );
};

export default AuditorPage;
