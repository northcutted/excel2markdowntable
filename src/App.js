import ExcelToMarkdown from "./Components/ExcelToMarkdown";
import { ThemeProvider, StyledEngineProvider, createTheme, adaptV4Theme } from "@mui/material/styles";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import {useMemo, useState, createContext} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "./Components/Styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./App.css";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export default function App() {
  const [mode, setMode] = useState(
    useMediaQuery("(prefers-color-scheme: dark)") ? "dark" : "light"
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () => createTheme(adaptV4Theme(mode === "light" ? lightTheme : darkTheme)),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header></Header>
          <ExcelToMarkdown />
          <Footer></Footer>
        </ThemeProvider>
      </StyledEngineProvider>
    </ColorModeContext.Provider>
  );
}
