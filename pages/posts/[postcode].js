import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import {
  Avatar,
  Box,
  Breadcrumbs,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { getPostDetail } from "../../apis/post_apis";
import { getUserDetail } from "../../apis/user_apis";
import PostDeleteModal from "../../components/Post/PostDeleteModal";
import PostEditModal from "../../components/Post/PostEditModal";

export async function getServerSideProps(context) {
  const { postcode } = context.query;

  return {
    props: {
      postcode,
    },
  };
}

export default function PostDetail({ postcode }) {
  const [post, setPost] = React.useState(null);
  const [user, setUser] = React.useState(null);

  function getPostData() {
    getPostDetail(postcode)
      .then((res) => {
        setPost(res.data);
        getUserDetail(res.data.user_id)
          .then((res) => setUser(res.data))
          .catch(() => {});
      })
      .catch(() => {});
  }

  React.useEffect(() => {
    getPostData();
  }, []);

  return (
    <Box mt={3}>
      <Breadcrumbs>
        <Link href={`/`}>
          <Typography fontSize={"0.9rem"}>
            <HomeOutlinedIcon fontSize="small" />
          </Typography>
        </Link>
        <Link href={`/posts`}>
          <Typography fontSize={"0.9rem"}>Posts</Typography>
        </Link>
        <Typography color={"text.dark"} fontSize={"0.9rem"}>
          #{post?.id}
        </Typography>
      </Breadcrumbs>
      {post && user ? (
        <Box mt={3}>
          <Typography fontSize={"1.6rem"} fontWeight={600} variant="h1">
            {post.title}
          </Typography>
          <Stack alignItems={"center"} direction={"row"} gap={1} mt={1}>
            <Typography variant="caption">by</Typography>
            <Link href={`/users/${user.id}`}>
              <Typography
                component="span"
                fontWeight={500}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  "&:hover": { textDecoration: "underline" },
                }}
                variant="caption"
              >
                <Avatar
                  alt={user.name}
                  src={`https://picsum.photos/50`}
                  sx={{
                    backgroundColor: "text.light",
                    width: "1rem",
                    height: "1rem",
                  }}
                />
                {user.name}
              </Typography>
            </Link>
          </Stack>
          <Stack alignItems={"center"} direction={"row"} gap={1} mt={2}>
            <PostEditModal post={post} getPostData={getPostData} />
            <PostDeleteModal postId={post.id} />
          </Stack>
          <Box mt={2}>
            <Typography color={"text.main"}>{post.body}</Typography>
          </Box>
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
    </Box>
  );
}
