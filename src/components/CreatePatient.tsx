import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { PatientFormValues } from "../interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { patientSchema } from "../schemas";
import { useCreatePatient } from "../services/patient.service";

function formatearRUT(rut: string) {
  const rutLimpio = rut.replace(/[.\-\s]/g, '');
  if (rutLimpio.length < 2) {
    return rut;
  }

  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1).toUpperCase();

  const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${cuerpoFormateado}-${dv}`;
}

export default function CreatePatient() {
  const { control, handleSubmit } = useForm<PatientFormValues>({
    resolver: yupResolver(patientSchema),
    defaultValues: {
      name: "",
      rut: "",
    }
  });

  const { mutate: createPatient } = useCreatePatient();

  const onSubmit = (data: PatientFormValues) => {
    createPatient(data);
  };

  return (
    <Box width={500} p={4}>
      <Typography variant="h5" component="div">
        Agregar Paciente
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
          name="name"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Nombre"
              variant="outlined"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="rut"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Rut"
              variant="outlined"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(formatearRUT(value));
              }}
            />
          )}
        />

        <Button type="submit" variant="contained" color="primary" size="large">
          Agregar
        </Button>
      </Box>
    </Box>
  );
}
