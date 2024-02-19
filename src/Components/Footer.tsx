import { useTheme, Theme } from "@mui/material/styles";
import Box from "@mui/system/Box";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "@mui/material/Link";

/**
 * Footer component.
 * 
 * @returns The rendered Footer component.
 */
const Footer: React.FC = () => {
  const theme: Theme = useTheme();

  return (
    <Box
      sx={{
        marginTop: theme.spacing(4),
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.secondary.main,
        textAlign: "center",
        width: "100%",
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      Created by <a href="https://northcutted.github.io/resume/">northcutted</a>{" "}
      <s>with ❤️</s> out of pure frustration with GitLab's editor no
      longer doing this for me
      <br></br>
      <Link
        href="https://github.com/northcutted/excel2markdowntable"
        target="_blank"
      >
        <GitHubIcon sx={{ marginRight: theme.spacing(1) }} />
        <span>Version: {process.env.REACT_APP_VERSION}</span>
      </Link>
    </Box>
  );
};

export default Footer;