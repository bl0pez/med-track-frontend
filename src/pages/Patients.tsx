import {
  Box,
  Button,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PlusIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { usePatients } from "../services/patient.service";
import {
  MainTable,
  MainTableBody,
  MainTableHead,
  MainTablePagination,
} from "../components/CustomTable";
import { PatientStatus, Role } from "../interfaces";
import dayjs from "dayjs";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from "react-router-dom";
import { ProtectiveRoles } from "../components/ProtectiveRoles";
import { useModalStore } from "../store/useModalStore";

const columns = ["ID", "Rut", "Nombre", "Estado", "Ingreso", "Acciones"];

export default function PatientsPage() {
  const [limit, setLimit] = useState(5);

  const { data, isLoading, refetch, handlePageChange } = usePatients({
    limit: limit,
  });

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
              <TextField label="Buscar" variant="outlined" size="small" />
              <Button
                size="small"
                variant="contained"
                onClick={() => refetch()}
                startIcon={<PersonSearchIcon />}
              >
                Buscar
              </Button>
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

        <MainTable>
          <MainTableHead columns={columns} />

          <MainTableBody
            isLoading={isLoading}
            text="No se encontraron pacientes"
            colSpan={columns.length}
            itemsCount={data?.metadata.totalRows}
          >
            {data?.patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.id}</TableCell>
                <TableCell>{patient.rut}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>
                  {patient.status === PatientStatus.ACTIVE
                    ? "Activo"
                    : "Inactivo"}
                </TableCell>
                <TableCell>
                  {dayjs(patient.createdAt).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>
                  <Button component={Link} to={`/patient/${patient.id}`} variant="outlined">
                    <RemoveRedEyeIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </MainTableBody>
        </MainTable>

        <MainTablePagination
          itemCount={data?.metadata.totalRows}
          page={data?.metadata.currentPage}
          limit={limit}
          handleChangeLimit={(value) => setLimit(value)}
          handleChangePage={(page) => {
            console.log(page);
            handlePageChange(page + 1);
            refetch();
          }}
          
        />
      </Box>
    </Box>
  );
}
