import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import AppNavbar from "../components/AppNavbar";

export default function AppLayout() {
  return (
    <Stack direction="row">
        <SideMenu />
        <AppNavbar />
        <Stack component={"main"} sx={{ mt: 8, maxWidth: "100%", width: "100%", padding: 4 }}>
          <Outlet />
        </Stack>
    </Stack>
  );
}