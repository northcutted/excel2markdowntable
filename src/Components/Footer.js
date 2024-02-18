import { useTheme } from "@mui/material/styles";
import Box from "@mui/system/Box";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        marginTop: theme.spacing(4),
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper, // or any color you prefer
        color: theme.palette.secondary.main,
        textAlign: "center",
        width: "100%",
        position: "sticky",
        bottom: 0,
        left: 0,
      }}
    >
      Created by <a href="https://northcutted.github.io/resume/">northcutted</a>{" "}
      <strike>with ❤️</strike> out of pure frustration with GitLab's editor no
      longer doing this for me | {new Date().getFullYear()}
    </Box>
  );
};
export default Footer;
