import { Box, styled } from "@mui/material";
import { spmiNilaiMutuStore } from "../../../stores/store.spmi.nilai-mutu";
import Breadcrumb from "../../../components/Breadcrumb";
import SimpleCard from "../../../components/SimpleCard";

import { useEffect } from "react";
import ItLoading from "../../../components/ItLoading";
import { Alert } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
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
    loading,
    error,
    listSpmiNilaiMutu,
    spmiNilaiMutuDataTable,
    getListNilaiMutu,
  } = spmiNilaiMutuStore();
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
        {loading ? (
          <ItLoading />
        ) : error ? (
          <Alert sx={{ m: 1 }} severity="error" variant="filled">
            {error}
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
