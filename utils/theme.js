import { grey, teal } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    secondary: {
      light: grey[500],
      main: grey[700],
      dark: grey[900],
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
      light: teal[300],
      main: teal[500],
      dark: teal[700],
    },
    secondary: {
      light: grey[500],
      main: grey[700],
      dark: grey[900],
    },
    background: {
      paper: "#222731",
      default: "#222731",
    },
  },
});
