import { useStyles } from "./Styles";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.footer}>
      Created by <a href="https://northcutted.github.io/resume/">northcutted</a>{" "}
      <strike>with ❤️</strike> out of pure frustration with GitLab's editor no
      longer doing this for me |  {new Date().getFullYear()}
    </div>
  );
};
export default Footer;
