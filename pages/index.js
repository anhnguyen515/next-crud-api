import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
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
          <Typography fontSize={"1.5rem"} gutterBottom variant="h2">
            New Users
          </Typography>
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2 }}>
            <Masonry gutter="1rem">
              {users.map((item, index) => (
                <UserCard key={index} user={item} />
              ))}
            </Masonry>
          </ResponsiveMasonry>
          <br />
          <Typography fontSize={"1.5rem"} gutterBottom variant="h2">
            New Posts
          </Typography>
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2 }}>
            <Masonry gutter="1rem">
              {posts.map((item, index) => (
                <PostCard key={index} post={item} />
              ))}
            </Masonry>
          </ResponsiveMasonry>
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
