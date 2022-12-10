import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import ScrollToTop from "react-scroll-to-top";

export default function MainLayout({ children, isDarkMode, toggleTheme }) {
  const router = useRouter();

  return (
    <Container maxWidth="lg">
      <Box sx={{ pt: 3, pb: 3 }}>
        <Stack
          alignItems={"center"}
          direction={"row"}
          flexWrap={"wrap"}
          gap={2}
          justifyContent={"space-between"}
        >
          <Link href={`/`}>
            <Typography fontSize={"1.3rem"} fontWeight={600} variant="h1">
              Simple CRUD
            </Typography>
          </Link>
          <Stack
            alignItems={"center"}
            direction={"row"}
            divider={<Divider orientation="vertical" flexItem />}
            gap={3}
          >
            <Link href={"/users"}>
              <Typography
                color={router.asPath.includes("/users") && "primary.main"}
                fontWeight={router.asPath.includes("/users") && 500}
                sx={{ "&:hover": { textDecoration: "underline" } }}
              >
                Users
              </Typography>
            </Link>
            <Link href={"/posts"}>
              <Typography
                color={router.asPath.includes("/posts") && "primary.main"}
                fontWeight={router.asPath.includes("/posts") && 500}
                sx={{ "&:hover": { textDecoration: "underline" } }}
              >
                Posts
              </Typography>
            </Link>

            <IconButton onClick={toggleTheme} size="small">
              {isDarkMode ? (
                <LightModeIcon fontSize="small" />
              ) : (
                <DarkModeIcon fontSize="small" />
              )}
            </IconButton>
          </Stack>
        </Stack>
        {children}
        <ScrollToTop smooth />
      </Box>
    </Container>
  );
}
