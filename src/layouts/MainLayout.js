import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

import { BG_IMAGE_URL } from "../app/config";

function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh", backgroundColor:"blanchedalmond"
    // backgroundSize: 'fill', backgroundRepeat: `no-repeat`, backgroundImage: `url(${BG_IMAGE_URL}8I37NtDffNV7AZlDa7uDvvqhovU.jpg)` 
    }}>
      <MainHeader />

      <Outlet />

      <Box sx={{ flexGrow: 1 }} />

      <MainFooter />
    </Stack>
  );
}

export default MainLayout;