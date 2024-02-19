import { createTheme, Theme } from "@mui/material/styles";

/**
 * Represents the dark theme for the application.
 */
export const darkTheme: Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#44475a",
    },
    secondary: {
      main: "#bd93f9",
    },
    background: {
      default: "#1e1e1e",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
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
  },
});

/**
 * Defines the light theme for the application.
 */
export const lightTheme: Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1e1e1e",
    },
    secondary: {
      main: "#556cd6",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#2e3131",
      secondary: "#757575",
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
  },
});