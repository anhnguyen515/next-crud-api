import {
  Box,
  Container,
  IconButton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function MainLayout({ children, isDarkMode, toggleTheme }) {
  return (
    <Container maxWidth="lg">
      <Box sx={{ pt: 3, pb: 3 }}>
        <Stack alignItems={"center"} direction={"row"}>
          <Typography fontSize={"1.5rem"} fontWeight={500} variant="h1">
            CRUD API with NextJS
          </Typography>
          {/* <IconButton onClick={toggleTheme} sx={{ ml: "auto" }}>
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton> */}
          <Stack
            alignItems={"center"}
            direction={"row"}
            gap={1}
            sx={{ ml: "auto" }}
          >
            <LightModeIcon
              color={!isDarkMode ? "primary" : "secondary"}
              fontSize={!isDarkMode ? "small" : "inherit"}
            />
            <Switch checked={isDarkMode} onChange={toggleTheme} size="small" />
            <DarkModeIcon
              color={isDarkMode ? "primary" : "secondary"}
              fontSize={isDarkMode ? "small" : "inherit"}
            />
          </Stack>
        </Stack>
        {children}
      </Box>
    </Container>
  );
}
