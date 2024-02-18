import { useTheme } from "@mui/material/styles";
import Box from "@mui/system/Box";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "@mui/material/Link";

const Footer = () => {
  const theme = useTheme();

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
      <strike>with ❤️</strike> out of pure frustration with GitLab's editor no
      longer doing this for me
      <br></br>
      <Link
        href="https://github.com/northcutted/excel2markdowntable"
        target="_blank"
      >
        <GitHubIcon />
        <pre>Version: {process.env.REACT_APP_VERSION} | Commit: {process.env.REACT_APP_COMMIT} | Build Date: {process.env.REACT_APP_BUILD_DATE}</pre>
      </Link>
    </Box>
  );
};
export default Footer;
