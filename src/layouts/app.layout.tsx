import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import AppNavbar from "../components/AppNavbar";

export default function AppLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Outlet />
          </Stack>
        </Box>
    </Box>
  );
}