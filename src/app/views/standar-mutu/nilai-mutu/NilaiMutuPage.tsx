import {
  Box,
  styled,
  TableCell,
  IconButton,
  Icon,
  TableRow,
} from "@mui/material";
import { spmiNilaiMutuStore } from "../../../stores/store.spmi.nilai-mutu";
import Breadcrumb from "../../../components/Breadcrumb";
import SimpleCard from "../../../components/SimpleCard";
import PaginationTable from "../PaginationTable";

import { useEffect, useState } from "react";
import ItLoading from "../../../components/ItLoading";
import { Alert } from "@mui/material";
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
  const { loading, error, listSpmiNilaiMutu, getListNilaiMutu } =
    spmiNilaiMutuStore();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
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

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
    getListNilaiMutu(page + 1, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    getListNilaiMutu(page + 1, rowsPerPage);
  };

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

  useEffect(() => {
    getListNilaiMutu(page + 1, rowsPerPage);
  }, [page, rowsPerPage]);
  const headers = ["Nilai Mutu", "Deskripsi", "Tahun", "Lembaga"];

  const dataNilaiMutu = listSpmiNilaiMutu?.data.map((nilaiMutu, index) => (
    <TableRow key={index}>
      <TableCell align="left">{nilaiMutu.nilai_mutu}</TableCell>
      <TableCell align="center">{nilaiMutu.desc}</TableCell>
      <TableCell align="center">{nilaiMutu.tahun_data.tahun}</TableCell>
      <TableCell align="center">
        {nilaiMutu.lembaga_akreditasi_data.name}
      </TableCell>

      <TableCell align="right">
        <IconButton>
          <Icon color="error">close</Icon>
        </IconButton>
        {/* <IconButton onClick={() => handleEdit(projects[index].id)}>
          <Icon color="success">edit</Icon>
        </IconButton> */}
      </TableCell>
    </TableRow>
  ));

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
        {/* {loading ? <ItLoading /> : <Typography>aman</Typography>} */}

        {loading ? (
          <ItLoading />
        ) : error ? (
          <Alert sx={{ m: 1 }} severity="error" variant="filled">
            {error}
          </Alert>
        ) : listSpmiNilaiMutu !== null ? (
          <SimpleCard title="Daftar Penilaian Mutu">
            <PaginationTable
              page={page}
              count={listSpmiNilaiMutu?.data.length}
              headers={headers}
              data={dataNilaiMutu}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
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
