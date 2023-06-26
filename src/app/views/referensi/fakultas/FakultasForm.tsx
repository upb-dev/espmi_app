import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { LoadingButton } from "@mui/lab";
import React, { Dispatch, SetStateAction } from "react";
import { SpmiFakultasPayload } from "../../../types/spmi.fakultas";
import * as Yup from "yup";
import { SpmiFakultasService } from "../../../services/service.spmi.fakultas";
import Swal from "sweetalert2";

const validationFakultas = Yup.object().shape({
  name: Yup.string().required("Nama wajib diisi"),
});

interface FakultasFormProps {
  id: string | null;
  loading: boolean | null;
  initialValues: SpmiFakultasPayload;
  handleClose: () => void;
  setLoadingForm: Dispatch<SetStateAction<boolean>>;
  handleClickOpen: () => void;
  open: boolean;
}

const FakultasForm: React.FC<FakultasFormProps> = (props) => {
  const {
    id,
    loading,
    setLoadingForm,
    initialValues,
    handleClose,
    handleClickOpen,

    open,
  } = props;

  const handleFormSubmit = (values: SpmiFakultasPayload) => {
    setLoadingForm(true);
    if (id !== null) {
      SpmiFakultasService.updateFakultasById(id, values)
        .then((res) => {
          setLoadingForm(false);
          console.log(res);
          Swal.fire({
            title: "Sukses",
            text: "Data Fakultas di Update",
            icon: "success",
          });
          handleClose();
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
          setLoadingForm(false);
          console.log(err);
        });
    } else {
      SpmiFakultasService.createFakultas(values)
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: "Sukses",
            text: "Data Fakultas Disimpan",
            icon: "success",
          });
          setLoadingForm(false);
          handleClose();
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
          setLoadingForm(false);
          console.log(err);
        });
    }
  };
  console.log(initialValues);
  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <Icon>add</Icon>Tambah Fakultas
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={validationFakultas}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <DialogTitle id="form-dialog-title">
                {id !== null ? "Edit" : "Tambah"} Data Fakultas
              </DialogTitle>
              <DialogContent>
                <TextField
                  focused
                  autoFocus
                  fullWidth
                  size="small"
                  type="text"
                  name="name"
                  value={values.name}
                  label="Nama Fakultas"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.name! && errors.name!}
                  error={Boolean(errors.name! && touched.name)}
                  sx={{ mt: 3, mb: 2 }}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  color="primary"
                  loading={loading!}
                  variant="contained"
                >
                  Simpan
                </LoadingButton>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </Box>
  );
};
export default FakultasForm;
