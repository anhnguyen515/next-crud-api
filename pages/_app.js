import "@fontsource/roboto";
import "../styles/globals.css";

import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Cookies from "js-cookie";
import React from "react";
import MainLayout from "../components/layout/MainLayout";
import createEmotionCache from "../utils/createEmotionCache";
import { darkTheme, lightTheme } from "../utils/theme";

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  function toggleTheme() {
    setIsDarkMode((prev) => !prev);
  }

  React.useEffect(() => {
    const data = Cookies.get("isDarkMode");
    if (data !== undefined) {
      setIsDarkMode(JSON.parse(data));
    }
  }, []);

  React.useEffect(() => {
    Cookies.set("isDarkMode", isDarkMode, { secure: true, expires: 365 });
  }, [isDarkMode]);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <MainLayout isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
          <Component {...pageProps} />
        </MainLayout>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
