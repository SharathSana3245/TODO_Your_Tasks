// src/context/ThemeContext.js
import React, { createContext, useContext, useMemo, useState } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

const ThemeContext = createContext();

export const useThemeMode = () => useContext(ThemeContext);

// Define light and dark color palettes
const light = {
  palette: {
    mode: "light",
    background: {
      default: "#f9f9f9",
      paper: "#ffffff",
    },
    primary: {
      main: "#1976d2", // blue
    },
    secondary: {
      main: "#9c27b0", // purple
    },
    text: {
      primary: "#000000",
      secondary: "#555555",
    },
  },
};

const dark = {
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
    primary: {
      main: "#90caf9", // light blue
    },
    secondary: {
      main: "#ce93d8", // light purple
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
  },
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () => createTheme(mode === "light" ? light : dark),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
