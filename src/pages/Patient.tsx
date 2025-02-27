import { useParams } from "react-router-dom";
import { usePatient } from "../services/patient.service";
import { Spinner } from "../components/Spinner";
import {
  Box,
  Button,
  Card,
  CardContent,
  SvgIconProps,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { PatientStatus, Role } from "../interfaces";
import InfoIcon from "@mui/icons-material/Info";
import dayjs from "dayjs";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import BadgeIcon from "@mui/icons-material/Badge";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Grid from "@mui/material/Grid2";
import { ProtectiveRoles } from "../components/ProtectiveRoles";
import { useModalStore } from "../store/useModalStore";
import { useState } from "react";
import PlusIcon from "@mui/icons-material/Add";

// const columns = ["N° Tanque", "Creación", "Devolución", "status", "Capacidad"];

export default function PatientPage() {
  const { id } = useParams();
  const handleOpen = useModalStore((state) => state.handleOpen);

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);

  const { data, isLoading, error } = usePatient(id!);


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

            <ProtectiveRoles roles={[Role.ADMIN, Role.OPERATOR]}>
            <Button
              onClick={() => {
                // handleOpen("createTank", data.id)}
              }}
              size="small"
              variant="contained"
              startIcon={<PlusIcon />}
            >
              Agregar
            </Button>
            </ProtectiveRoles>
          </Box>
        </Box>

        
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
      <Card sx={{ height: '100%' }}>
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
              <Typography fontSize={{ xs: "small", lg: "0.9rem" }} variant="h3">
                {label}:
              </Typography>

              <Typography fontSize={{ xs: "1.5rem", lg: "1.2rem"}}>
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
