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
import { BsGithub, BsMailbox2, BsTelephoneFill } from "react-icons/bs";

export default function MainLayout({ children, isDarkMode, toggleTheme }) {
  const router = useRouter();

  return (
    <Container maxWidth="lg">
      <Stack sx={{ pt: 3, pb: 3, minHeight: "100vh" }}>
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
        <Box sx={{ flex: 1 }}>{children}</Box>
        <Divider light sx={{ mt: 3, mb: 3 }} />
        <Stack
          alignItems={"center"}
          direction={"row"}
          gap={2}
          justifyContent={"space-between"}
          sx={{
            flexDirection: {
              xs: "column",
              sm: "row",
            },
          }}
        >
          <Stack
            gap={0.5}
            sx={{
              alignItems: {
                xs: "center",
                sm: "flex-start",
              },
            }}
          >
            <Stack alignItems={"center"} direction={"row"} gap={1}>
              <BsGithub />
              <Typography variant="caption">
                <a href="https://github.com/anhnguyen515">
                  https://github.com/anhnguyen515
                </a>
              </Typography>
            </Stack>
            <Stack alignItems={"center"} direction={"row"} gap={1}>
              <BsMailbox2 />
              <Typography variant="caption">ndtatuananh@gmail.com</Typography>
            </Stack>
            <Stack alignItems={"center"} direction={"row"} gap={1}>
              <BsTelephoneFill />
              <Typography variant="caption">039 8938 320</Typography>
            </Stack>
          </Stack>
          <Typography fontSize={"1.2rem"} fontWeight={500} variant="h3">
            Simple CRUD
          </Typography>
          <Stack
            sx={{
              alignItems: {
                xs: "center",
                sm: "flex-end",
              },
            }}
          >
            <Typography variant="caption">Made by Anh Nguyễn</Typography>
            <Typography variant="caption">
              with{" "}
              <a href="https://gorest.co.in" style={{ color: "grey" }}>
                https://gorest.co.in
              </a>{" "}
              API
            </Typography>
          </Stack>
        </Stack>
        <ScrollToTop smooth />
      </Stack>
    </Container>
  );
}
