import React, { FC, useMemo, useState, createContext } from "react";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import ExcelToMarkdown from "./Components/ExcelToMarkdown";
import { lightTheme, darkTheme } from "./Components/Styles";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

interface ColorModeContextProps {
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextProps>({
  toggleColorMode: () => { },
});

/**
 * The main component of the application.
 */
const App: FC = () => {
  const [mode, setMode] = useState<string>(
    useMediaQuery("(prefers-color-scheme: dark)") ? "dark" : "light"
  );

  /**
   * The color mode context value.
   */
  const colorMode = useMemo<ColorModeContextProps>(
    () => ({
      /**
       * Toggles the color mode between light and dark.
       */
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  /**
   * The theme based on the current color mode.
   */
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
};

export default App;