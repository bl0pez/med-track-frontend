import { Controller, useForm } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schemas";
import { LoginFormValues } from "../interfaces";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from "@mui/icons-material/Lock";
import { useLogin } from "../services/auth.service";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function LoginPage() {
  const { mutate, isPending } = useLogin();
  const login = useAuthStore((state) => state.login);
  const form = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const handleSubmit = ({ email, password }: LoginFormValues) => {
    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          login(data.token, data.user);
        },
        onError: (error) => {
          if (isAxiosError(error)) {
            return toast.error(error.response?.data.message);
          }

          toast.error("Ocurrió un error inesperado");
        },
      }
    );
  };

  return (
    <Card sx={{ minWidth: 400, margin: "auto" }}>
      <CardContent>
        <Box
          component="form"
          onSubmit={form.handleSubmit(handleSubmit)}
          display={"flex"}
          flexDirection={"column"}
          gap={4}
          borderRadius={2}
        >
          <Typography
            variant="h1"
            color="primary"
            align="center"
            sx={{ fontWeight: "bold", fontSize: 40 }}
          >
            Med Tank
          </Typography>

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <TextField
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AlternateEmailIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label="Correo electrónico"
                type="email"
                variant="outlined"
                fullWidth
                {...field}
              />
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <TextField
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label="Contraseña"
                type="password"
                variant="outlined"
                fullWidth
                {...field}
              />
            )}
          />

          <Button
            disabled={isPending}
            loading={isPending}
            type="submit"
            size="large"
            variant="contained"
          >
            Iniciar sesión
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
