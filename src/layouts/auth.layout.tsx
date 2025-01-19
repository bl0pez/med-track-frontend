import { Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
    <CssBaseline />
    <Container
        maxWidth="lg"
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}
    >
        <Outlet />
    </Container>
    </>
  );
}