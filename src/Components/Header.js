import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../App";
import Logo from "../assets/logo.png";
import Box from "@mui/material/Box";

export default function Header() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(1, 2),
      }}
    >
      <Toolbar>
      <Box
        component="img"
        sx={{
          height: 64,
          padding: theme.spacing(1),
        }}
        alt="Logo"
        src={Logo}
      />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Excel/CSV to Markdown Table Converter
        </Typography>
        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
          size="large"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
