import { createTheme } from "@mui/material/styles";

const lightMode = createTheme({
  palette: {
    primary: {
      main: "#006bb7",
      light: "#3389c5",
      dark: "#005692",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#94c3e3",
      light: "#f9fcfe",
      dark: "#3389c5",
    },
    success: {
      main: "#66BB6A",
      light: "#d1e5f3",
      dark: "#4CAF50",
      contrastText: "#ffffff",
    },
    error: {
      main: "#E57373",
      light: "#EF9A9A",
      dark: "#EF5350",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
    },
  },
});

const darkMode = createTheme({
  palette: {
    primary: {
      main: "#FFA500",
      light: "#FBCEB1",
      dark: "#8B8000",
    },
    success: {
      main: "#66BB6A",
      light: "#81C784",
      dark: "#4CAF50",
      contrastText: "#ffffff",
    },
    error: {
      main: "#E57373",
      light: "#EF9A9A",
      dark: "#EF5350",
      contrastText: "#ffffff",
    },
    background: {
      default: "#16113a",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

const themes = {
  light: lightMode,
  dark: darkMode,
};

export default themes;
