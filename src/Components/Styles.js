import { makeStyles } from "@mui/styles";
import { createTheme, adaptV4Theme } from "@mui/material/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
    padding: theme.spacing(2),
    maxWidth: 600, // Adjust as needed
  },
  textarea: {
    width: "100%",
    height: "150px",
    bgcolor: theme.palette.background.paper,
    padding: theme.spacing(1),
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    color: theme.palette.text.primary,
  },
  button: {
    padding: theme.spacing(1, 2),
    fontSize: "16px",
    textTransform: "uppercase",
    backgroundColor: theme.palette.primary.main, // Adjust the color as needed
    color: theme.palette.common.white,
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },
  appBar: {
    backgroundColor: theme.palette.secondary.main, // Adjust the color as needed
    padding: theme.spacing(1, 2),
  },
  footer: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper, // or any color you prefer
    color: theme.palette.secondary.main,
    textAlign: "center",
    width: "100%",
    position: "sticky",
    bottom: 0,
    left: 0,
  },
  markdownTable: {
    borderCollapse: "collapse",
    width: "100%",
    marginTop: theme.spacing(2),
  },
  markdownTableCell: {
    border: "1px solid #ddd",
    padding: theme.spacing(1),
    textAlign: "left",
  },
  markdownTableHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  markdownTableRow: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.text.secondary,
    },
    "&:hover": {
      backgroundColor: theme.palette.text.primary,
    },
  },
  markdownPreviewContainer: {
    marginTop: theme.spacing(2),
  },
  // Responsive adjustments
  "@media (max-width: 768px)": {
    container: {
      padding: theme.spacing(1),
    },
    textarea: {
      marginBottom: theme.spacing(1.5),
    },
    button: {
      padding: theme.spacing(1),
    },
  },
}));

export const darkTheme = createTheme(adaptV4Theme({
  palette: {
    mode: "dark",
    primary: {
      main: "#bd93f9", // A bright blue that stands out in the dark background
    },
    secondary: {
      main: "#bd93f9", // A soft purple for contrast
    },
    background: {
      default: "#1e1e1e", // Very dark grey for the background
      paper: "#1e1e1e", // Slightly lighter grey for paper elements
    },
    text: {
      primary: "#ffffff", // White for primary text
      secondary: "#b3b3b3", // Light grey for secondary text
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h5: {
      fontWeight: 500,
      fontSize: "1.5rem",
      letterSpacing: "0.0075em",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none", // Buttons will use the text's original casing
      },
    },
  },
}));

export const lightTheme = createTheme(adaptV4Theme({
  palette: {
    mode: "light",
    primary: {
      main: "#556cd6", // A soft blue
    },
    secondary: {
      main: "#1e1e1e", // A calming teal
    },
    background: {
      default: "#ffffff", // Light grey for the background
      paper: "#ffffff", // Pure white for paper elements
    },
    text: {
      primary: "#2e3131", // Dark grey for primary text
      secondary: "#757575", // Medium grey for secondary text
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h5: {
      fontWeight: 500,
      fontSize: "1.5rem",
      letterSpacing: "0.0075em",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none", // Buttons will use the text's original casing
      },
    },
  },
}));
