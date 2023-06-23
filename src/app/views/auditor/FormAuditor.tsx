import {
  Box,
  FormControlLabel,
  FormLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  Autocomplete,
  Typography,
  useTheme,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { LoadingButton } from "@mui/lab";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import { SpmiLembagaAkreditasi } from "../../types/spmi.lembaga-akreditasi";
import Swal from "sweetalert2";
import { SpmiUnit } from "../../types/spmi.unit";
import { SpmiAuditorPayload } from "../../types/spmi.auditor";

interface FormAuditorProps {
  id: string | null;
  loading: boolean | null;
  initialValues: SpmiAuditorPayload;
  handleClose: () => void;
  setLoadingForm: Dispatch<SetStateAction<boolean>>;
  listUnit: SpmiUnit[];
  listLembagaAkreditasi: SpmiLembagaAkreditasi[];
  handleClickOpen: () => void;
  open: boolean;
}

const validationSchema = Yup.object().shape({
  nik: Yup.string().required("NIK wajib diisi"),
  gelar_depan: Yup.string(),
  nama_lengkap: Yup.string().required("Nama Lenkgap Wajib Diisi"),
  gelar_belakang: Yup.string(),
  lembaga_akreditasi_id: Yup.array().of(Yup.string()).min(1, "Pilih minimal 1"),
  gender: Yup.number().required(),
  instansi: Yup.string().required("Instansi Wajib diisi"),
  jabatan: Yup.string().required("Jabatan Wajib diisi"),
  units_id: Yup.array().of(Yup.string()).min(1, "Pilih minimal 1"),
});

const FormAuditor: React.FC<FormAuditorProps> = (props) => {
  const theme = useTheme();
  const {
    id,
    loading,
    setLoadingForm,
    initialValues,
    handleClose,
    handleClickOpen,
    listLembagaAkreditasi,
    listUnit,
    open,
  } = props;
  const [selectedLembaga, setSelectedLembaga] = useState<
    SpmiLembagaAkreditasi[] | undefined
  >([]);
  const [selectedUnit, setSelectedUnit] = useState<SpmiUnit[] | undefined>([]);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const handleFormSubmit = () => {
    console.log("submit");
  };

  const handleChangeGender = (
    value: React.ChangeEvent<HTMLInputElement>,
    values: SpmiAuditorPayload
  ) => {
    setSelectedGender(value.target.value);
    values.gender = parseInt(value.target.value);
  };
  function handleLembagaChange(
    value: SpmiLembagaAkreditasi[] | null,
    values: SpmiAuditorPayload
  ): void {
    if (value !== null) {
      setSelectedLembaga(value);
      value.forEach((item) => {
        if (!values.lembaga_akreditasi_id.includes(item.id!)) {
          values.lembaga_akreditasi_id.push(item.id!);
        }
      });
      const listId = value.map((val) => val.id!);
      const updated = values.lembaga_akreditasi_id.filter((item) =>
        listId.includes(item)
      );
      values.lembaga_akreditasi_id = updated;
    } else if (value === null) {
      setSelectedLembaga(undefined);
      values.lembaga_akreditasi_id = [];
    }
    console.log(values);
  }

  function handleUnitChange(
    value: SpmiUnit[] | null,
    values: SpmiAuditorPayload
  ): void {
    if (value !== null) {
      setSelectedUnit(value);
      value.forEach((item) => {
        if (!values.units_id.includes(item.id!)) {
          values.units_id.push(item.id!);
        }
      });
      const listId = value.map((val) => val.id!);
      const updated = values.units_id.filter((item) => listId.includes(item));
      values.units_id = updated;
    } else if (value === null) {
      setSelectedUnit(undefined);
      values.units_id = [];
    }
    console.log(values);
  }
  console.log(listUnit);
  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <Icon>add</Icon>Tambah Auditor
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
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
                Tambah Data Auditor
              </DialogTitle>
              <DialogContent>
                <TextField
                  focused
                  autoFocus
                  fullWidth
                  size="small"
                  type="text"
                  name="nik"
                  value={values.nik}
                  label="NIK"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.nik! && errors.nik!}
                  error={Boolean(errors.nik! && touched.nik)}
                  sx={{ mt: 3, mb: 2 }}
                />
                <Grid container direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="gelar_depan"
                      value={values.gelar_depan}
                      label="Gelar Depan"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      helperText={touched.gelar_depan && errors.gelar_depan}
                      error={Boolean(errors.gelar_depan && touched.gelar_depan)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      focused
                      autoFocus
                      fullWidth
                      size="small"
                      type="text"
                      name="nama_lengkap"
                      value={values.nama_lengkap}
                      label="Nama Lengkap"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      helperText={touched.nama_lengkap! && errors.nama_lengkap!}
                      error={Boolean(
                        errors.nama_lengkap! && touched.nama_lengkap
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="gelar_belakang"
                      value={values.gelar_belakang}
                      label="Gelar Bekalang"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      helperText={
                        touched.gelar_belakang && errors.gelar_belakang
                      }
                      error={Boolean(
                        errors.gelar_belakang && touched.gelar_belakang
                      )}
                    />
                  </Grid>
                </Grid>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Jenis Kelamin
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={values.gender}
                  onChange={(val) => handleChangeGender(val, values)}
                >
                  <FormControlLabel
                    value={2}
                    control={<Radio />}
                    label="Perempuan"
                  />
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="Laki - laki"
                  />
                </RadioGroup>
                <ErrorMessage
                  name="gender"
                  component="div"
                  render={(message) => (
                    <Typography
                      style={{
                        color: `${theme.palette.error.main}`,
                        fontSize: "12px",
                      }}
                    >
                      {message}
                    </Typography>
                  )}
                />
                <Autocomplete
                  id="lembaga_akreditasi_id"
                  options={listLembagaAkreditasi}
                  multiple
                  value={selectedLembaga}
                  size="small"
                  onSubmit={handleChange}
                  onOpen={handleBlur}
                  onBlur={handleBlur}
                  isOptionEqualToValue={(option, value) => option === value}
                  onChange={(_, value: SpmiLembagaAkreditasi[] | null) =>
                    handleLembagaChange(value, values)
                  }
                  getOptionLabel={(option: SpmiLembagaAkreditasi) =>
                    option.name
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Pilih Lembaga Akreditasi"
                      variant="outlined"
                      name="lembaga_akreditasi_id"
                      fullWidth
                      error={Boolean(
                        errors.lembaga_akreditasi_id &&
                          touched.lembaga_akreditasi_id
                      )}
                      helperText={
                        touched.lembaga_akreditasi_id &&
                        errors.lembaga_akreditasi_id
                      }
                      sx={{
                        mb: 2,
                        mt: 2,
                      }}
                    />
                  )}
                />
                <Autocomplete
                  id="units_id"
                  options={listUnit}
                  multiple
                  value={selectedUnit}
                  size="small"
                  onSubmit={handleChange}
                  onOpen={handleBlur}
                  onBlur={handleBlur}
                  isOptionEqualToValue={(option, value) => option === value}
                  onChange={(_, value: SpmiUnit[] | null) =>
                    handleUnitChange(value, values)
                  }
                  getOptionLabel={(option: SpmiUnit) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Pilih Unit"
                      variant="outlined"
                      name="units_id"
                      fullWidth
                      error={Boolean(errors.units_id && touched.units_id)}
                      helperText={touched.units_id && errors.units_id}
                      sx={{
                        mb: 2,
                        mt: 2,
                      }}
                    />
                  )}
                />
                <TextField
                  focused
                  autoFocus
                  fullWidth
                  size="small"
                  type="text"
                  name="instansi"
                  value={values.instansi}
                  label="Instansi"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.instansi! && errors.instansi!}
                  error={Boolean(errors.instansi! && touched.instansi)}
                  sx={{ mt: 2, mb: 2 }}
                />
                <TextField
                  focused
                  autoFocus
                  fullWidth
                  size="small"
                  type="text"
                  name="jabatan"
                  value={values.jabatan}
                  label="Jabatan"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.jabatan! && errors.jabatan!}
                  error={Boolean(errors.jabatan! && touched.jabatan)}
                  sx={{ mt: 2, mb: 2 }}
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

export default FormAuditor;
