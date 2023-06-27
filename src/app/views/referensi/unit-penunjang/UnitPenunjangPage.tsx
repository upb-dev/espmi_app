import { styled, Box, Button } from "@mui/material";
import Breadcrumb, { RouteSegment } from "../../../components/Breadcrumb";
import { useEffect, useState } from "react";
import ItLoading from "../../../components/ItLoading";
import SimpleCard from "../../../components/SimpleCard";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import UnitPenunjangForm from "./UnitPenunjangForm";
import FilterCard from "../../FilterCard";
import { SpmiServiceProps } from "../../../services/service.spmi.nilai-mutu";
import {
  SpmiUnitPenunjangStore,
  spmiUnitPenunjangActivity,
} from "../../../stores/store.spmi.unit-penunjang";

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

const UnitPenunjangPage = () => {
  const routeSegments: RouteSegment[] = [
    { name: "Unit Penunjang", path: "/unit-penunjang" },
    { name: "List Unit Penunjang" },
  ];

  const {
    loading,
    listUnitPenunjang,
    spmiUnitPenunjangDataTable,
    getListUnitPenunjang,
  } = SpmiUnitPenunjangStore();

  const { initialValue, setActivity } = spmiUnitPenunjangActivity();

  const columns: GridColDef[] = [
    { field: "id", headerName: "No", width: 70 },
    { field: "code", headerName: "Code", type: "string", width: 100 },
    { field: "address", headerName: "Address", type: "string", width: 300 },
    { field: "desc", headerName: "Keterangan", type: "string", width: 300 },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: "right",
      width: 150,
      align: "right",
      renderCell: (params) => {
        const id = parseInt(params.id.toString());

        const data = listUnitPenunjang[id - 1];
        const handleUpdate = () => {
          setActivity("edit", data);

          setOpen(true);
          setEdit(data!.id!);
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
  const [edit, setEdit] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [param, setParam] = useState<SpmiServiceProps>({});

  function handleClose() {
    setActivity("reset");
    setOpen(false);
    getListUnitPenunjang();
  }

  function handleClickOpen() {
    setOpen(true);
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
    getListUnitPenunjang(param);
  }, [param]);

  return (
    <Container>
      <HeaderContainer>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={routeSegments} />
        </Box>
        <Box display="flex">
          <UnitPenunjangForm
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            initialValues={initialValue}
            id={edit}
            open={open}
            setLoadingForm={setLoadingForm}
            loading={loadingForm}
          />
        </Box>
      </HeaderContainer>
      <div style={{ paddingBottom: "10px" }}>
        <FilterCard
          handleDelete={handleDelete}
          handleFilterLembaga={() => {}}
          handleFilterTahun={() => {}}
          handleSearch={handleSearch}
          listLembagaAkreditasi={[]}
          searchOnly={true}
          setSearch={setSearch}
          deleteButtonDisabled={deleteButtonDisabled}
          key={1}
          listTahunPeriode={[]}
          search={search}
          selectedLembaga={undefined}
          selectedTahun={undefined}
          title="Fakultas"
        />
      </div>
      {loading ? (
        <ItLoading />
      ) : (
        <SimpleCard title="Daftar Fakultas">
          <div style={{ height: "100%", width: "100%" }}>
            <DataGrid
              columns={columns}
              rows={spmiUnitPenunjangDataTable}
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

export default UnitPenunjangPage;
