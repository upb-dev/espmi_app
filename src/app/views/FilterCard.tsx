import React, { ChangeEvent } from "react";
import {
  Autocomplete,
  Card,
  CardContent,
  Grid,
  Icon,
  IconButton,
  InputBase,
  Paper,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SpmiTahunPeriode } from "../types/spmi.tahun-periode";
import { SpmiLembagaAkreditasi } from "../types/spmi.lembaga-akreditasi";

interface FilterCardProps {
  selectedTahun?: SpmiTahunPeriode | null;
  handleFilterTahun: (value: SpmiTahunPeriode | null) => void;
  listTahunPeriode?: SpmiTahunPeriode[];
  selectedLembaga?: SpmiLembagaAkreditasi | null;
  handleFilterLembaga: (value: SpmiLembagaAkreditasi | null) => void;
  listLembagaAkreditasi: SpmiLembagaAkreditasi[];
  search?: string;
  setSearch: (value: string) => void;
  handleSearch: () => void;
  handleDelete: () => void;
  deleteButtonDisabled?: boolean;
  searchOnly: boolean;
  title?: string;
}

const FilterCard: React.FC<FilterCardProps> = ({
  selectedTahun,
  handleFilterTahun,
  listTahunPeriode,
  selectedLembaga,
  handleFilterLembaga,
  listLembagaAkreditasi,
  search,
  setSearch,
  handleSearch,
  handleDelete,
  deleteButtonDisabled,
  searchOnly,
  title,
}) => {
  const handleTahunChange = (
    _: ChangeEvent<{}>,
    newValue: SpmiTahunPeriode | null
  ) => {
    handleFilterTahun(newValue);
  };

  const handleLembagaChange = (
    _: ChangeEvent<{}>,
    newValue: SpmiLembagaAkreditasi | null
  ) => {
    handleFilterLembaga(newValue);
  };

  return (
    <Card elevation={2}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            {searchOnly !== true && (
              <Stack columnGap={2} spacing={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Icon>filter_list</Icon>
                  <Typography>Filter Data Target Nilai</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Autocomplete
                    value={selectedTahun}
                    onChange={handleTahunChange}
                    id="filter-tahun-periode"
                    options={listTahunPeriode!}
                    getOptionLabel={(option: SpmiTahunPeriode) =>
                      option.tahun.toString()
                    }
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Tahun Periode" />
                    )}
                  />
                  <Autocomplete
                    value={selectedLembaga}
                    onChange={handleLembagaChange}
                    id="filter-lembaga-akreditasi"
                    options={listLembagaAkreditasi}
                    getOptionLabel={(option: SpmiLembagaAkreditasi) =>
                      option.name
                    }
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Lembaga Akreditasi" />
                    )}
                  />
                </Stack>
              </Stack>
            )}
          </Grid>
          <Grid item sm={6}>
            <Stack columnGap={2} spacing={2} justifyContent="space-between">
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="end"
              >
                <Icon>settings</Icon>
                <Typography>Aksi</Typography>
              </Stack>
              <Stack direction="row" spacing={2} justifyContent="end">
                <Paper
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 300,
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder={`Cari ${title !== undefined ? title : ""}`}
                    inputProps={{ "aria-label": "cari" }}
                  />
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    onClick={handleSearch}
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                  disabled={deleteButtonDisabled}
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FilterCard;
