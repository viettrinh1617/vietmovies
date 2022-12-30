import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";
import logoImg from "../logo.png";
import { ReactComponent as LogoSvg } from '../tmdb.svg';

function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Box sx={{display:'flex', justifyContent: 'center', alignContent: 'center', width: 40, height: 40, ...sx }}>
      {/* <img src={logoImg} alt="logo" width="100%" /> */}
      <LogoSvg alt="logo" width="100%" />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}

export default Logo;