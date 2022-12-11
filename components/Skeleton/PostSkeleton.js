import { Paper, Skeleton } from "@mui/material";
import React from "react";

export default function PostSkeleton() {
  return (
    <Paper sx={{ p: 2 }}>
      <Skeleton variant="text" sx={{ fontSize: "1.3rem", mb: 1 }} />
      <Skeleton variant="text" sx={{ fontSize: "0.9rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "0.9rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "0.9rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "0.9rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "0.9rem" }} />
    </Paper>
  );
}
