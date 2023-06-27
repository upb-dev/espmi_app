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
import { SpmiUnitPenunjangPayload } from "../../../types/spmi.unit-penunjang";
import * as Yup from "yup";
import { SpmiUnitPenunjangService } from "../../../services/service.spmi.unit-penunjang";
import Swal from "sweetalert2";

const validationUnitPenunjang = Yup.object().shape({
  code: Yup.string().required("Code wajib diisi"),
  address: Yup.string().required("Address wajib diisi"),
  desc: Yup.string().required("Keterangan wajib diisi"),
});

interface UnitPenunjangFormProps {
  id: string | null;
  loading: boolean | null;
  initialValues: SpmiUnitPenunjangPayload;
  handleClose: () => void;
  setLoadingForm: Dispatch<SetStateAction<boolean>>;
  handleClickOpen: () => void;
  open: boolean;
}

const UnitPenunjangForm: React.FC<UnitPenunjangFormProps> = (props) => {
  const {
    id,
    loading,
    setLoadingForm,
    initialValues,
    handleClose,
    handleClickOpen,

    open,
  } = props;

  const handleFormSubmit = (values: SpmiUnitPenunjangPayload) => {
    setLoadingForm(true);
    if (id !== null) {
      SpmiUnitPenunjangService.updateUnitPenunjangById(id, values)
        .then((res) => {
          setLoadingForm(false);
          console.log(res);
          Swal.fire({
            title: "Sukses",
            text: "Data Unit Penunjang di Update",
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
      SpmiUnitPenunjangService.createUnitPenunjang(values)
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: "Sukses",
            text: "Data Unit Penunjang Disimpan",
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
        <Icon>add</Icon>Tambah Unit Penunjang
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
          validationSchema={validationUnitPenunjang}
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
                {id !== null ? "Edit" : "Tambah"} Data Unit Penunjang
              </DialogTitle>
              <DialogContent>
                <TextField
                  focused
                  autoFocus
                  fullWidth
                  size="small"
                  type="text"
                  name="code"
                  value={values.code}
                  label="Code"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.code! && errors.code!}
                  error={Boolean(errors.code! && touched.code)}
                  sx={{ mt: 3, mb: 2 }}
                />
                <TextField
                  focused
                  autoFocus
                  fullWidth
                  size="small"
                  type="text"
                  name="address"
                  value={values.address}
                  label="Address"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.address! && errors.address!}
                  error={Boolean(errors.address! && touched.address)}
                  sx={{ mt: 3, mb: 2 }}
                />
                <TextField
                  focused
                  autoFocus
                  fullWidth
                  size="small"
                  type="text"
                  name="desc"
                  value={values.desc}
                  label="Keterangan"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.desc! && errors.desc!}
                  error={Boolean(errors.desc! && touched.desc)}
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
export default UnitPenunjangForm;
