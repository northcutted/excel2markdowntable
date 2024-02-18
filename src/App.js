import {useMemo, useState, createContext} from "react";
import { ThemeProvider, StyledEngineProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import ExcelToMarkdown from "./Components/ExcelToMarkdown";
import { lightTheme, darkTheme } from "./Components/Styles";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

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
    () => createTheme(mode === "light" ? lightTheme : darkTheme),
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
