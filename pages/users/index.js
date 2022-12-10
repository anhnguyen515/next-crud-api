import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { getAllUsers } from "../../apis/user_apis";
import UserCard from "../../components/User/UserCard";

export default function Users() {
  const [users, setUsers] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [loadBtn, setLoadBtn] = React.useState(false);

  function getData() {
    setLoadBtn(true);
    getAllUsers({ page: page, per_page: 20 })
      .then((res) => {
        setUsers([...(users || []), ...res.data]);
        setHasMore(true);
        setLoadBtn(false);
      })
      .catch(() => {
        setUsers([]);
        setHasMore(false);
        setLoadBtn(false);
      });
  }

  function loadMoreUsers() {
    setPage((prev) => prev + 1);
  }

  React.useEffect(() => {
    getData();
  }, [page]);

  return (
    <Box mt={3}>
      <Breadcrumbs>
        <Link href={`/`}>
          <Typography fontSize={"0.9rem"}>
            <HomeOutlinedIcon fontSize="small" />
          </Typography>
        </Link>
        <Typography color={"text.dark"} fontSize={"0.9rem"}>
          Users
        </Typography>
      </Breadcrumbs>
      {users ? (
        <div>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            mb={1}
            mt={1}
          >
            <Typography fontSize={"1.5rem"} variant="h2">
              Users
            </Typography>
            <Button
              component={Link}
              href={`/users/add-user`}
              startIcon={<PersonAddAltRoundedIcon />}
              sx={{ textTransform: "none" }}
            >
              Add New User
            </Button>
          </Stack>
          <Grid container spacing={2}>
            {users.map((item, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <UserCard user={item} />
              </Grid>
            ))}
          </Grid>
          <Stack alignItems={"center"} mt={3}>
            {hasMore ? (
              <LoadingButton
                loading={loadBtn}
                onClick={loadMoreUsers}
                startIcon={<ArrowDownwardRoundedIcon />}
                sx={{ textTransform: "none" }}
                variant="outlined"
              >
                Load More
              </LoadingButton>
            ) : (
              <Typography>No more data to load</Typography>
            )}
          </Stack>
        </div>
      ) : (
        <Stack
          alignItems={"center"}
          direction={"row"}
          gap={2}
          justifyContent={"center"}
          mt={5}
        >
          <CircularProgress size={24} />
          <Typography>Loading...</Typography>
        </Stack>
      )}
    </Box>
  );
}
