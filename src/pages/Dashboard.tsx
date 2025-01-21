import Grid from "@mui/material/Grid2";
import { useSystemMetrics } from "../services/system-metrics.service";
import { Spinner } from "../components/Spinner";
import { Card, CardContent, SvgIconProps, Typography } from "@mui/material";
import PropaneTankIcon from '@mui/icons-material/PropaneTank';
import { FC } from "react";
import GroupIcon from '@mui/icons-material/Group';
import dayjs from "dayjs";

export default function DashboardPage() {

  const { data, isLoading } = useSystemMetrics();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Grid container spacing={2} columns={12}>
      {
        data?.map((metric) => (
          <>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <MainCard
                icon={GroupIcon}
                label="Total pacientes activos"
                title={metric.total_patients_active}
                type="text"
                iconColor="#2eda61"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <MainCard
                icon={GroupIcon}
                label="Total pacientes inactivos"
                title={metric.total_patients_inactive}
                type="text"
                iconColor="#D92632"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <MainCard
                icon={PropaneTankIcon}
                label="Total tubos de oxígeno entregados"
                title={metric.total_tanks_delivered}
                type="text"
                iconColor="#2F80ED"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <MainCard
                icon={PropaneTankIcon}
                label="Total tubos de oxígeno recargados"
                title={metric.total_tanks_recharge}
                type="text"
                iconColor="#2F80ED"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <MainCard
                icon={PropaneTankIcon}
                label="Total tubos de oxígeno devueltos"
                title={metric.total_tanks_returned}
                type="text"
                iconColor="#2F80ED"
              />
            </Grid>


          </>
        ))
      }
    </Grid>
  );
}

interface Props {
  icon: React.ElementType<SvgIconProps>;
  label: string;
  title: string | number | Date;
  type?: "date" | "text";
  iconColor?: string;
}

const MainCard: FC<Props> = ({ icon: Icon, label, title, type, iconColor }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent
        sx={{ textAlign: 'center' }}
      >
        <Typography
          component="h2"
          variant="caption"
          gutterBottom
          sx={{ fontWeight: '600' }}
        >
          {label}
        </Typography>
        <Icon 
          sx={{ fontSize: 50, color: iconColor }}
        />
        <Typography 
          sx={{ color: 'text.secondary', fontSize: 30, bgcolor: 'background.paper' }}
        >
          {type === "date" ? dayjs(title).format("DD/MM/YYYY") : String(title)}
        </Typography>
      </CardContent>
    </Card>
  )
}