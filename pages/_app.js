import "@fontsource/roboto";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Cookies from "js-cookie";
import { DefaultSeo } from "next-seo";
import NextNProgress from "nextjs-progressbar";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import MainLayout from "../components/layout/MainLayout";
import createEmotionCache from "../utils/createEmotionCache";
import { darkTheme, lightTheme } from "../utils/theme";

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
  router,
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function toggleTheme() {
    setIsDarkMode((prev) => !prev);
    Cookies.set("isDarkMode", isDarkMode == true ? false : true, {
      secure: true,
      expires: 7,
    });
  }

  useEffect(() => {
    const data = Cookies.get("isDarkMode");
    if (data !== undefined) {
      setIsDarkMode(JSON.parse(data));
    }
  }, []);

  return (
    <>
      <CacheProvider value={emotionCache}>
        <DefaultSeo title="Simple CRUD" />
        <NextNProgress
          nonce="my-nonce"
          showOnShallow
          color={
            isDarkMode
              ? darkTheme.palette.primary.main
              : lightTheme.palette.primary.main
          }
          startPosition={0.3}
          // stopDelayMs={200}
          height={3}
          options={{
            showSpinner: false,
          }}
        />
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <CssBaseline />
          <MainLayout isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
            <Component {...pageProps} key={router.asPath} />
          </MainLayout>
        </ThemeProvider>
        <ToastContainer autoClose={3000} />
      </CacheProvider>
    </>
  );
}

export default MyApp;
