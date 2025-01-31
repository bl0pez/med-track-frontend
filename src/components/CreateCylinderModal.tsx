import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { CylinderCapacity, CylinderFormValues } from "../interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { cylinderSchema } from "../schemas";
import { useCreateCylinder } from "../services/cylinder.service";
import { useBarcodeScanner } from "../hooks/useBarcodeScanner";
import { cylinderCapacity } from "../helpers";
import { useEffect } from "react";

export default function CreateCylinderModal() {
  const { mutate, isPending, isSuccess,  } = useCreateCylinder();

  const { control, handleSubmit, setValue } = useForm<CylinderFormValues>({
    resolver: yupResolver(cylinderSchema),
    defaultValues: {
      serialNumber: "",
      capacity: CylinderCapacity.SIX_M3,
    },
  });

  const onSubmit = (data: CylinderFormValues) => {
    mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      setValue("serialNumber", "");
    }
  }, [isSuccess, setValue]);

  useBarcodeScanner((scannedCode) => {
    setValue("serialNumber", scannedCode);
  });

  return (
    <Box p={4} sx={{ width: 400 }}>
      <Typography variant="h5" component="div">
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
          name="serialNumber"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Número de serie"
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
              <InputLabel id="capacity-label">Capacidad</InputLabel>
              <Select
                labelId="capacity-label"
                id="capacity"
                value={field.value}
                label="Tipo de Solicitud"
                onChange={field.onChange}
                error={!!fieldState.error}
              >
                {Object.entries(CylinderCapacity).map(([key, value]) => (
                  <MenuItem key={key} value={value}>
                    {cylinderCapacity[value]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={isPending}
          loading={isPending}
        >
          Agregar
        </Button>
      </Box>
    </Box>
  );
}
