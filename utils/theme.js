import { blue, green, grey, teal } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#2e6ff31a",
      main: "#2E6FF3",
      dark: blue[800],
    },
    secondary: {
      light: grey[400],
      main: grey[500],
      dark: grey[600],
    },
    text: {
      primary: grey[800],
      light: grey[300],
      main: grey[500],
      dark: grey[700],
    },
    success: {
      main: green[500],
      contrastText: "#fff",
    },
    background: {
      paper: "#fff",
      default: "#fff",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#26a69a1a",
      main: teal[400],
      dark: teal[700],
    },
    secondary: {
      light: grey[400],
      main: grey[500],
      dark: grey[600],
    },
    text: {
      light: grey[300],
      main: grey[500],
      dark: grey[700],
    },
    success: {
      main: green[500],
      contrastText: "#fff",
    },
    background: {
      paper: "#222731",
      default: "#222731",
    },
  },
});
