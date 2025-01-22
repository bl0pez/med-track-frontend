import { Box, Button, Typography } from "@mui/material";
import Co2Icon from '@mui/icons-material/Co2';


export default function CreateTankModal() {
    // const { } = useForm();


    return (
        <Box p={4} sx={{ width: 400 }}>
            {/* <Typography variant="h5" component="div">
                <Box
                    bgcolor={"primary.main"}
                >
                    <Co2Icon />
                </Box>
                Agregar Tanque
            </Typography> */}
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Typography variant="h5" component="div">
                    <Co2Icon fontSize="large" />
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    gap: 4,
                    flexDirection: "column",
                    mt: 4,
                    width: "100%",
                }}
                component="form"
            //   onSubmit={handleSubmit(onSubmit)}
            >
                {/* <Controller
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
          /> */}

                {/* <Controller
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
          /> */}

                <Button type="submit" variant="contained" color="primary" size="large">
                    Agregar
                </Button>
            </Box>
        </Box>
    )
}