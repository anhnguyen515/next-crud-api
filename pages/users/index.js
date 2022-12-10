import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { getAllUsers } from "../../apis/user_apis";
import UserCard from "../../components/User/UserCard";
import DownloadIcon from "@mui/icons-material/Download";
import { LoadingButton } from "@mui/lab";

export default function Users() {
  const [users, setUsers] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [loadBtn, setLoadBtn] = React.useState(false);

  function getData(page) {
    setLoadBtn(true);
    getAllUsers({ page: page, per_page: 20 })
      .then((res) => {
        setUsers((prev) => prev.concat(res.data));
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
    getData(page + 1);
  }

  React.useEffect(() => {
    getData(page);
  }, []);

  return (
    <Box mt={3}>
      {users.length !== 0 ? (
        <div>
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
                startIcon={<DownloadIcon />}
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
