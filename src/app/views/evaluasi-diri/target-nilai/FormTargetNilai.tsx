import { Autocomplete, Box, Icon } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { LoadingButton } from "@mui/lab";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { SpmiTargetNilaiPayload } from "../../../types/spmi.target-nilai";
import { SpmiTahunPeriode } from "../../../types/spmi.tahun-periode";
import { SpmiLembagaAkreditasi } from "../../../types/spmi.lembaga-akreditasi";
import { SpmiTargetNilaiService } from "../../../services/service.spmi.target-nilai";
import Swal from "sweetalert2";
import { SpmiProgramStudi } from "../../../types/spmi.program-studi";

const validationProject = Yup.object().shape({
  nilai_target: Yup.string().required("Nilai mutu is required !"),
  desc: Yup.string().required("Description is required !"),
  lembaga_akreditasi: Yup.string().required("Lembaga harus dipilih"),
  tahun: Yup.string().required("Tahun harus dipilih"),
  program_studi: Yup.string().required("Program Studi harus dipilih"),
});

interface FormTargetNilaiProps {
  id: string | null;
  loading: boolean | null;
  initialValues: SpmiTargetNilaiPayload;
  handleClose: () => void;
  setLoadingForm: Dispatch<SetStateAction<boolean>>;
  listTahunPeriode: SpmiTahunPeriode[];
  listLembagaAkreditasi: SpmiLembagaAkreditasi[];
  listProgramStudi: SpmiProgramStudi[];
  handleClickOpen: () => void;
  open: boolean;
}

const FormTargetNilai: React.FC<FormTargetNilaiProps> = (props) => {
  const [selectedLembaga, setSelectedLembaga] =
    useState<SpmiLembagaAkreditasi | null>(null);
  const [selectedTahun, setSelectedTahun] = useState<SpmiTahunPeriode | null>(
    null
  );
  const [selectedProgramStudi, setSelectedProgramStudi] =
    useState<SpmiProgramStudi | null>(null);
  const {
    id,
    loading,
    setLoadingForm,
    initialValues,
    handleClose,
    handleClickOpen,
    listLembagaAkreditasi,
    listTahunPeriode,
    listProgramStudi,
    open,
  } = props;

  function handleTahunChange(
    value: SpmiTahunPeriode | null,
    values: SpmiTargetNilaiPayload
  ) {
    if (value !== null) {
      setSelectedTahun(value);
      values.tahun = value.id;
    } else {
      setSelectedTahun(null);
      values.tahun = null;
    }
  }
  function handleProgramStudiChange(
    value: SpmiProgramStudi | null,
    values: SpmiTargetNilaiPayload
  ) {
    if (value !== null) {
      setSelectedProgramStudi(value);
      values.program_studi = value.id;
    } else {
      setSelectedProgramStudi(null);
      values.program_studi = null;
    }
  }
  function handleLembagaChange(
    value: SpmiLembagaAkreditasi | null,
    values: SpmiTargetNilaiPayload
  ) {
    if (value !== null) {
      setSelectedLembaga(value);
      values.lembaga_akreditasi = value.id;
    } else {
      setSelectedLembaga(null);
      values.lembaga_akreditasi = null;
    }
  }

  const handleFormSubmit = (values: SpmiTargetNilaiPayload) => {
    setLoadingForm(true);
    if (id != null) {
      SpmiTargetNilaiService.updateTargetNilaiById(id, values)
        .then((result) => {
          console.log(result);
          setLoadingForm(false);
          Swal.fire({
            title: "Sukses",
            text: "Data Penilaian Mutu di Update",
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
      SpmiTargetNilaiService.createTargetNilai(values)
        .then((result) => {
          console.log(result);
          Swal.fire({
            title: "Sukses",
            text: "Data Penilaian Mutu Disimpan",
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

  function handleSelectedItem() {
    if (selectedLembaga !== null) {
      setSelectedLembaga(null);
    }
    if (selectedTahun !== null) {
      setSelectedTahun(null);
    }
  }
  useEffect(() => {
    handleSelectedItem();
  }, [open]);

  useEffect(() => {
    if (initialValues.lembaga_akreditasi !== null) {
      const lembaga = listLembagaAkreditasi.find(
        (result) => result.id === initialValues.lembaga_akreditasi
      );
      setSelectedLembaga(lembaga as SpmiLembagaAkreditasi);
    }
    if (initialValues.tahun !== null) {
      const tahun = listTahunPeriode.find(
        (result) => result.id === initialValues.tahun
      );
      setSelectedTahun(tahun as SpmiTahunPeriode);
    }
    if (initialValues.program_studi !== null) {
      const programStudi = listProgramStudi.find(
        (result) => result.id == initialValues.program_studi
      );
      setSelectedProgramStudi(programStudi as SpmiProgramStudi);
    }
  }, [initialValues]);

  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <Icon>add</Icon>Tambah Target Nilai
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={validationProject}
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
                Tambah Data Penilain Mutu
              </DialogTitle>
              <DialogContent>
                <Box paddingTop={2}>
                  <Autocomplete
                    id="program_studi"
                    options={listProgramStudi}
                    value={selectedProgramStudi}
                    size="small"
                    onSubmit={handleChange}
                    onOpen={handleBlur}
                    onBlur={handleBlur}
                    isOptionEqualToValue={(option, value) => option === value}
                    onChange={(_, value: SpmiProgramStudi | null) =>
                      handleProgramStudiChange(value, values)
                    }
                    getOptionLabel={(option: SpmiProgramStudi) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Pilih Program Studi"
                        variant="outlined"
                        name="program_studi"
                        fullWidth
                        error={Boolean(
                          errors.program_studi && touched.program_studi
                        )}
                        helperText={
                          touched.program_studi && errors.program_studi
                        }
                      />
                    )}
                  />
                </Box>
                <Box paddingTop={2}>
                  <Autocomplete
                    id="tahun"
                    options={listTahunPeriode}
                    value={selectedTahun}
                    size="small"
                    onSubmit={handleChange}
                    onOpen={handleBlur}
                    onBlur={handleBlur}
                    isOptionEqualToValue={(option, value) => option === value}
                    onChange={(_, value: SpmiTahunPeriode | null) =>
                      handleTahunChange(value, values)
                    }
                    getOptionLabel={(option: SpmiTahunPeriode) =>
                      option.tahun.toString()
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Pilih Tahun Periode"
                        variant="outlined"
                        name="tahun"
                        fullWidth
                        error={Boolean(errors.tahun && touched.tahun)}
                        helperText={touched.tahun && errors.tahun}
                      />
                    )}
                  />
                </Box>
                <Box paddingTop={2}>
                  <Autocomplete
                    id="lembaga_akreditasi"
                    options={listLembagaAkreditasi}
                    value={selectedLembaga}
                    size="small"
                    onSubmit={handleChange}
                    onOpen={handleBlur}
                    onBlur={handleBlur}
                    isOptionEqualToValue={(option, value) => option === value}
                    onChange={(_, value: SpmiLembagaAkreditasi | null) =>
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
                        name="lembaga_akreditasi"
                        fullWidth
                        error={Boolean(
                          errors.lembaga_akreditasi &&
                            touched.lembaga_akreditasi
                        )}
                        helperText={
                          touched.lembaga_akreditasi &&
                          errors.lembaga_akreditasi
                        }
                      />
                    )}
                  />
                </Box>
                <TextField
                  focused
                  autoFocus
                  fullWidth
                  size="small"
                  type="number"
                  name="nilai_target"
                  value={values.nilai_target}
                  label="Nilai Mutu"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.nilai_target! && errors.nilai_target!}
                  error={Boolean(errors.nilai_target! && touched.nilai_target)}
                  sx={{ mt: 3, mb: 2 }}
                />
                <TextField
                  fullWidth
                  multiline
                  maxRows={3}
                  size="small"
                  type="text"
                  name="desc"
                  value={values.desc}
                  label="Keterangan"
                  variant="outlined"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.desc && errors.desc}
                  error={Boolean(errors.desc && touched.desc)}
                  sx={{ mb: 2 }}
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
                  //   disabled={
                  //     values.lembaga_id === null || values.tahun === null
                  //   }
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

export default FormTargetNilai;
