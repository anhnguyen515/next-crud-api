import { Paper, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function PostCard({ post }) {
  return (
    <Link href={`/posts/${post.id}`}>
      <Paper
        sx={{
          p: 2,
          transition: "all 0.2s",
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
            WebkitLineClamp: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {post.title}
        </Typography>
        <Typography
          color="text.main"
          fontSize={"0.9rem"}
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 5,
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
