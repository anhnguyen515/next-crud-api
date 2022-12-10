import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { getAllPosts } from "../apis/post_apis";
import { getAllUsers } from "../apis/user_apis";
import PostCard from "../components/Post/PostCard";
import UserCard from "../components/User/UserCard";

export default function Homepage() {
  const [users, setUsers] = React.useState(null);
  const [posts, setPosts] = React.useState(null);

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
              <Grid key={index} item xs={12} sm={6} md={4}>
                <UserCard user={item} />
              </Grid>
            ))}
          </Grid>
          <br />
          <Typography fontSize={"1.3rem"} gutterBottom variant="h2">
            New Posts
          </Typography>
          <Grid container spacing={2}>
            {posts.map((item, index) => (
              <Grid key={index} item xs={12} sm={6}>
                <PostCard post={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
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
    </>
  );
}
