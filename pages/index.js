import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { getAllPosts } from "../apis/post_apis";
import { getAllUsers } from "../apis/user_apis";
import UserCard from "../components/User/UserCard";

export default function Homepage() {
  const [users, setUsers] = React.useState(null);
  const [posts, setPosts] = React.useState(null);

  console.log("re-render");

  function getUsersData() {
    getAllUsers().then((res) => setUsers(res.data));
  }

  function getPostsData() {
    getAllPosts().then((res) => setPosts(res.data));
  }

  React.useEffect(() => {
    getUsersData();
    getPostsData();
  }, []);

  return (
    <>
      {users && posts ? (
        <Box mt={3}>
          <Typography fontSize={"1.3rem"} gutterBottom variant="h2">
            New Users
          </Typography>
          <Grid container spacing={2}>
            {users.map((item, index) => (
              <Grid key={index} item xs={12} md={6}>
                <UserCard user={item} />
              </Grid>
            ))}
          </Grid>
          <br />
          <Typography fontSize={"1.3rem"} gutterBottom variant="h2">
            New Posts
          </Typography>
          {posts.map((item, index) => (
            <div key={index}>{item.title}</div>
          ))}
        </Box>
      ) : (
        <Stack alignItems={"center"} mt={3}>
          <CircularProgress size={64} />
        </Stack>
      )}
    </>
  );
}
