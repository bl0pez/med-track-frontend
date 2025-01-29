import { Box, Button, TextField, Typography } from "@mui/material";
import PlusIcon from "@mui/icons-material/Add";
import { useEffect, useMemo, useState } from "react";

import { Role } from "../interfaces";
import { ProtectiveRoles } from "../components/ProtectiveRoles";
import { useModalStore } from "../store/useModalStore";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import NumbersIcon from "@mui/icons-material/Numbers";
import { cylinderCapacity, cylinderStatus } from "../helpers";
import { useCylinders } from "../services/cylinder.service";

const PAGE_SIZE = 5;

const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },
  {
    field: "serialNumber",
    headerName: "Número de serie",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "capacity",
    headerName: "Capacidad",
    flex: 1,
    minWidth: 150,
    valueGetter: (value) => cylinderCapacity[value],
  },
  {
    field: "status",
    headerName: "Estado",
    flex: 1,
    minWidth: 150,
    valueGetter: (value) => cylinderStatus[value],
  },
];

export default function CylindersPage() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: PAGE_SIZE,
  });

  const queryOptions = useMemo(() => {
    return {
      limit: paginationModel.pageSize,
      page: paginationModel.page + 1,
    };
  }, [paginationModel]);

  const [search, setSearch] = useState("");
  const { data, isFetching, refetch } = useCylinders({
    search,
    ...queryOptions,
  });

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
      <Typography variant="h4">Cilindros</Typography>
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
                    startAdornment: <NumbersIcon sx={{ mr: 1 }} />,
                  },
                }}
                value={search}
                label="Buscar"
                variant="outlined"
                size="small"
              />
            </Box>

            <ProtectiveRoles roles={[Role.ADMIN, Role.OPERATOR]}>
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
            rows={data?.cylinders}
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
      </Box>
    </Box>
  );
}
