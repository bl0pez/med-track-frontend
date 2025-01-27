import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PlusIcon from "@mui/icons-material/Add";
import { useEffect, useMemo, useState } from "react";
import { usePatients } from "../services/patient.service";
import { Role } from "../interfaces";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import { ProtectiveRoles } from "../components/ProtectiveRoles";
import { useModalStore } from "../store/useModalStore";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { patientStatus } from "../helpers";

const PAGE_SIZE = 5;

const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Nombre", flex: 1, minWidth: 150 },
  { field: "rut", headerName: "RUT", flex: 1, minWidth: 150 },
  {
    field: "status",
    headerName: "Estado",
    minWidth: 150,
    flex: 1,
    valueGetter: (value) => `${patientStatus[value]}`,
  },
  {
    field: "actions",
    flex: 1,
    minWidth: 150,
    headerName: "Acciones",
    renderCell: (params) => (
      <Link to={`/patients/${params.row.id}`}>
        <IconButton size="small" aria-label="Ver" color="primary">
          <RemoveRedEyeIcon />
        </IconButton>
      </Link>
    ),
  }
];

export default function PatientsPage() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PAGE_SIZE,
  });

  const [search, setSearch] = useState("");

  const queryOptions = useMemo(() => {
    return {
      limit: paginationModel.pageSize,
      page: paginationModel.page + 1,
    };
  }, [paginationModel]);

  const { data, isFetching, refetch } = usePatients({ search, ...queryOptions });

  useEffect(() => {
    
    const handler = setTimeout(() => {
      refetch();
    }, 1000);

    return () => {
      clearTimeout(handler);
    };

  }, [search, refetch]);

  const handlePaginationChange = (model: GridPaginationModel) => {
    if (isFetching) return;

    setPaginationModel(model);
  };

  const handleOpen = useModalStore((state) => state.handleOpen);



  return (
    <Box>
      <Typography variant="h4">Pacientes</Typography>
      <Box sx={{ mt: 4 }}>
        <Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              marginTop: 2,
              marginBottom: 2,
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField 
                onChange={(e) => setSearch(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                          <PersonSearchIcon sx={{ mr: 1 }} />
                    ),
                  }
                }}
                value={search}
                label="Buscar" 
                variant="outlined" 
                size="small" 
              />
            </Box>

            <ProtectiveRoles roles={[Role.ADMIN, Role.MAINTENANCE]}>
              <Button
                onClick={() => handleOpen("add")}
                size="small"
                variant="contained"
                startIcon={<PlusIcon />}
              >
                Agregar
              </Button>
            </ProtectiveRoles>
          </Box>
        </Box>

        <div style={{ height: 400, width: "100%", maxWidth: "100%" }}>
          <DataGrid
            rows={data?.patients}
            columns={columns}
            pagination
            paginationMode="server"
            rowCount={data?.metadata.totalItems || 0}
            pageSizeOptions={[5, 10, 20]}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationChange}
            loading={isFetching}

            disableColumnMenu
            disableColumnSorting
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector

            

          />
        </div>

        {/* <MainTablePagination
          itemCount={data?.metadata.totalItems}
          page={data?.metadata.currentPage}
          limit={limit}
          handleChangeLimit={(value) => setLimit(value)}
          handleChangePage={(page) => {
            handlePageChange(page + 1);
            refetch();
          }}
          
        /> */}
      </Box>
    </Box>
  );
}
