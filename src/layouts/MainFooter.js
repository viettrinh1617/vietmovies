import React from "react";
import { Link, Typography } from "@mui/material";


function MainFooter() {
  return (
    <Typography sx={{mt: 4}} variant="body2" color="text.secondary" align="center" p={1}>
      <Link color="inherit" href="https://www.coderschool.vn">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default MainFooter;