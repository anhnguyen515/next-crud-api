import { Paper, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function PostCard({ post }) {
  return (
    <Link href={`/posts/${post.id}`}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 2,
          height: "100%",
          "&:hover": { backgroundColor: "primary.light" },
        }}
      >
        <Typography
          fontSize={"1.3rem"}
          fontWeight={500}
          gutterBottom
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {post.title}
        </Typography>
        <Typography
          color="text.main"
          sx={{
            mt: "auto",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {post.body}
        </Typography>
      </Paper>
    </Link>
  );
}
