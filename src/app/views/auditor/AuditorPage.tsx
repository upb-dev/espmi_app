import { styled, Box, Button, Stack } from "@mui/material";
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
import FilterCard from "../FilterCard";
import { SpmiServiceProps } from "../../services/service.spmi.nilai-mutu";

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
        const id = parseInt(params.id.toString());

        const data = listAuditor[id - 1];
        const handleUpdate = () => {
          setActivity("edit", data);
          if (isPreview === true) {
            setIsPreview(false);
          }
          setOpen(true);
          setEdit(data.id!);
        };
        const handleDetail = () => {
          setActivity("edit", data);
          setIsPreview(true);
          setOpen(true);
          setEdit(data.id!);
        };

        return (
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="outlined"
              color="info"
              onClick={handleDetail}
            >
              Detail
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              onClick={handleUpdate}
            >
              Update
            </Button>
          </Stack>
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
  const [search, setSearch] = useState<string>("");
  const [param, setParam] = useState<SpmiServiceProps>({});
  const [isPreview, setIsPreview] = useState<boolean>(false);

  function handleClose() {
    setActivity("reset");
    setOpen(false);
    getListAuditor();
  }
  function handleClickOpen() {
    setOpen(true);
    if (isPreview === true) {
      setIsPreview(false);
    }
    setEdit(null);
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
  const deleteButtonDisabled = selectedRowIds.length === 0;
  const isCellEditable = (params: any) => {
    return !selectedRowIds.includes(params.row.id);
  };
  const handleDelete = () => {
    // Handle delete action for selectedRow
    // Perform the desired delete action
    console.log("Delete selected row:", selectedRowIds);
  };

  function handleSearch() {
    const updatedParam: SpmiServiceProps = { ...param }; // Membuat salinan objek param

    if (search !== "") {
      updatedParam.search = search;
    } else {
      updatedParam.search = undefined;
    }

    setParam(updatedParam);
  }

  useEffect(() => {
    getListAuditor(param);
    if (listUnit.length === 0 || listLembagaAkreditasi.length === 0) {
      getLembagaAkreditasi();
      getListUnit();
    }
  }, [param]);
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
            isPreview={isPreview}
          />
        </Box>
      </HeaderContainer>
      <div style={{ paddingBottom: "10px" }}>
        <FilterCard
          handleDelete={handleDelete}
          handleFilterLembaga={() => {}}
          handleFilterTahun={() => {}}
          handleSearch={handleSearch}
          listLembagaAkreditasi={listLembagaAkreditasi}
          searchOnly={true}
          setSearch={setSearch}
          deleteButtonDisabled={deleteButtonDisabled}
          key={1}
          listTahunPeriode={[]}
          search={search}
          selectedLembaga={undefined}
          selectedTahun={undefined}
        />
      </div>
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

export default AuditorPage;
