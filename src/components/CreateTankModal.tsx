import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Co2Icon from "@mui/icons-material/Co2";
import { Controller, useForm } from "react-hook-form";
import {
  TankCapacity,
  TankRegisterFormValues,
  TankRequestType,
  TankStatus,
} from "../interfaces";
import { tankCapacity } from "../helpers";
import { useModalStore } from "../store/useModalStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { tankPatientSchema } from "../schemas";

export default function CreateTankModal() {
  const data: number = useModalStore((state) => state.data);

  const { control, handleSubmit } = useForm<TankRegisterFormValues>({
    resolver: yupResolver(tankPatientSchema),
    defaultValues: {
      number_tank: undefined,
      request_type: TankRequestType.PATIENT,
      capacity: TankCapacity.SIX_M3,
      status: TankStatus.DELIVERED,
      patient_id: data,
    },
  });

  const onSubmit = (data: TankRegisterFormValues) => {
    console.log(data);
  };

  return (
    <Box p={4} sx={{ width: 400 }}>
      <Typography
        variant="h5"
        component="div"
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <Box color={"primary.main"}>
          <Co2Icon />
        </Box>
        Agregar Cilindro
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexDirection: "column",
          mt: 4,
          width: "100%",
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="number_tank"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Numero de Cilindro"
              variant="outlined"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="capacity"
          render={({ field, fieldState }) => (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Tipo de Solicitud
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={field.value}
                label="Tipo de Solicitud"
                onChange={field.onChange}
                error={!!fieldState.error}
              >
                {Object.entries(TankCapacity).map(([key, value]) => (
                  <MenuItem key={key} value={value}>
                    {tankCapacity[value]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="status"
          render={({ field, fieldState }) => (
            <FormControl fullWidth error={!!fieldState.error}>
              <InputLabel id="tank-status">Estado</InputLabel>
              <Select
                labelId="tank-status"
                id={"tank-status"}
                value={field.value}
                label="Estado"
                onChange={field.onChange}
                error={!!fieldState.error}
              >
                <MenuItem value={TankStatus.DELIVERED}>Entregado</MenuItem>
                <MenuItem value={TankStatus.RECHARGE}>Recarga</MenuItem>
              </Select>
              <FormHelperText>
                {fieldState.error ? fieldState.error.message : ""}
              </FormHelperText>
            </FormControl>
          )}
        />

        {/* <Controller
          control={control}
          name="request_type"
          render={({ field, fieldState }) => (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Tipo de Solicitud
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={field.value}
                label="Tipo de Solicitud"
                onChange={field.onChange}
                error={!!fieldState.error}
              >
                {
                    Object.entries(TankRequestType).map(([key, value]) => (
                        <MenuItem key={key} value={value}>
                        { tankRequestType[value]  }
                        </MenuItem>
                    ))
                }
              </Select>
            </FormControl>
          )}
        /> */}

        <Button type="submit" variant="contained" color="primary" size="large">
          Agregar
        </Button>
      </Box>
    </Box>
  );
}
