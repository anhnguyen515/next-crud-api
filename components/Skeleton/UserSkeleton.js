import { Paper, Skeleton, Stack } from "@mui/material";
import React from "react";

export default function UserSkeleton() {
  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}
    >
      <Skeleton variant="circular" width={40} height={40} />
      <Stack>
        <Skeleton variant="text" sx={{ fontSize: "1.1rem", width: "10rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "0.7rem", width: "5rem" }} />
      </Stack>
    </Paper>
  );
}
