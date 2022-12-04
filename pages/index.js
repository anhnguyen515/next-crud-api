import { Box, Typography } from "@mui/material";
import React from "react";

export default function Homepage() {
  return (
    <>
      <Box mt={3}>
        <Typography fontSize={"1.3rem"} variant="h2">
          Current Posts
        </Typography>
        <Typography fontSize={"1.3rem"} variant="h2">
          Current Users
        </Typography>
      </Box>
    </>
  );
}
