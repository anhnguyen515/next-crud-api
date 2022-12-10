import { Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { capitalizedWord } from "../../utils/utils";

export default function UserCard({ user }) {
  return (
    <Link href={`/users/${user.id}`}>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          p: 2,
          height: "100%",
          width: "100%",
          "&:hover": {
            backgroundColor: "primary.light",
            borderColor: "primary.main",
          },
        }}
      >
        <Stack>
          <Typography fontSize={"1.1rem"} fontWeight={500}>
            {user.name}
          </Typography>

          <Typography fontSize={"0.7rem"}>
            Status:{" "}
            <Typography
              component={"span"}
              fontSize={"0.7rem"}
              fontWeight={500}
              sx={{
                color: user.status === "active" ? "success.main" : "error.main",
              }}
            >
              {capitalizedWord(user.status)}
            </Typography>
          </Typography>
        </Stack>
      </Paper>
    </Link>
  );
}
