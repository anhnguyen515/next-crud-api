import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { capitalizedWord } from "../../utils/utils";
import Link from "next/link";

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
            {user.genre === "male" ? (
              <MaleIcon
                fontSize="inherit"
                sx={{ color: "#64b5f6", position: "relative", top: 3 }}
              />
            ) : (
              <FemaleIcon
                fontSize="inherit"
                sx={{ color: "#f06292", position: "relative", top: 3 }}
              />
            )}
          </Typography>
          <Stack
            alignItems={"center"}
            direction={"row"}
            gap={0.5}
            mb={0.5}
            sx={{ color: "text.main" }}
          >
            <EmailOutlinedIcon fontSize="inherit" />
            <Typography
              fontSize={"0.8rem"}
              sx={{
                overflow: " hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user.email}
            </Typography>
          </Stack>
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
