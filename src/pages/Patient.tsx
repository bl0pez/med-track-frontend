import { Navigate, useParams } from "react-router-dom";
import { usePatient } from "../services/patient.service";
import { routes } from "../config/routes.config";
import { Spinner } from "../components/Spinner";
import {
  Box,
  Button,
  Card,
  CardContent,
  SvgIconProps,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { PatientStatus, Role, TankStatus } from "../interfaces";
import InfoIcon from "@mui/icons-material/Info";
import dayjs from "dayjs";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import BadgeIcon from "@mui/icons-material/Badge";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Grid from "@mui/material/Grid2";
import { ProtectiveRoles } from "../components/ProtectiveRoles";
import { MainTable, MainTableBody, MainTableHead, MainTablePagination } from "../components/CustomTable";
import { useModalStore } from "../store/useModalStore";
import { useSearchTanks } from "../services/tank.service";
import { useEffect, useState } from "react";
import { tankCapacity, tankStatus } from "../helpers";

const columns = ["N° Tanque", "Creación", "Devolución", "status", "m2"];

export default function PatientPage() {
  const { id } = useParams();
  const handleOpen = useModalStore((state) => state.handleOpen);

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);

  const { data, isLoading, error } = usePatient(id!);
  const { data: tanks, isLoading: isTanksLoafing, refetch } = useSearchTanks(search, "patient", Number(id));

  useEffect(() => {
    refetch();
  }, [search, refetch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <div>Paciente no encontrado</div>;
  }

  if (error) {
    return <div>Error al cargar el paciente</div>;
  }

  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Grid container spacing={2}>
        <CardInfo
          icon={PersonIcon}
          label="Nombre"
          title={data.name}
          type="text"
        />

        <CardInfo icon={Grid3x3Icon} label="ID" title={data.id} type="text" />

        <CardInfo icon={BadgeIcon} label="RUT" title={data.rut} type="text" />

        <CardInfo
          icon={AccessTimeIcon}
          label="Fecha de Ingreso"
          title={data.createdAt}
          type="date"
        />

        <CardInfo
          icon={InfoIcon}
          label="Estado"
          title={data.status === PatientStatus.ACTIVE ? "Activo" : "Inactivo"}
          type="text"
        />
      </Grid>

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
              <TextField label="Buscar" variant="outlined" size="small" onChange={(e) => setSearch(e.target.value)} />
            </Box>

            <ProtectiveRoles roles={[Role.ADMIN, Role.MAINTENANCE]}>
            <Button
              onClick={() => handleOpen("createTank")}
              size="small"
              variant="contained"
              // startIcon={<PlusIcon />}
            >
              Agregar
            </Button>
            </ProtectiveRoles>
          </Box>
        </Box>

        <MainTable>
          <MainTableHead columns={columns} />

          <MainTableBody
            isLoading={isTanksLoafing}
            text="No se encontraron pacientes"
            colSpan={columns.length}
            itemsCount={tanks?.metadata.size || 0}
          >
            {
              tanks
              ? tanks.tanks.map((tank) => (
                <TableRow key={tank.id}>
                  <TableCell>{tank.number_tank}</TableCell>
                  <TableCell>{dayjs(tank.createdAt).format("DD/MM/YYYY HH:mm")}</TableCell>
                  <TableCell>{tank.returnedAt ? dayjs(tank.returnedAt).format("DD/MM/YYYY HH:mm") : "-"}</TableCell>
                  <TableCell>{tankStatus[tank.status]}</TableCell>
                  <TableCell>{tankCapacity[tank.capacity]}</TableCell>
                </TableRow>
              ))
              : null
            }
          </MainTableBody>
        </MainTable>

        <MainTablePagination
          itemCount={tanks?.metadata.size || 0}
          page={tanks?.metadata.currentPage || 1}
          limit={limit}
          handleChangeLimit={(value) => setLimit(value)}
          handleChangePage={() => {}}
        />
      </Box>
    </>
  );
}

interface Props {
  icon: React.ElementType<SvgIconProps>;
  label: string;
  title: string | number | Date;
  type?: "date" | "text";
}

export const CardInfo = ({
  icon: Icon,
  label,
  title,
  type = "text",
}: Props) => {
  return (
    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
      <Card>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
            component="div"
            display="flex"
            gap={2}
            alignItems="center"
            flexWrap="wrap"
          >
            <Icon
              sx={{
                height: { xs: 40, lg: 50 },
                width: { xs: 40, lg: 50 },
                // display: { xs: "none", lg: "inline-block" },
                backgroundColor: "primary.main",
                borderRadius: 2,
                color: "primary.contrastText",
                p: 1,
              }}
            />

            <Box
              component="div"
              display="flex"
              flexDirection="column"
              gap={1}
              // alignItems="center"
            >
              <Typography fontSize={{ xs: "small", lg: "1.2rem" }} variant="h3">
                {label}:
              </Typography>

              <Typography fontSize={{ xs: "1.5rem", lg: "1.5rem" }} variant="h3">
                {type === "date"
                  ? dayjs(title).format("DD/MM/YYYY HH:mm")
                  : String(title)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
