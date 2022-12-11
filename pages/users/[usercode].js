import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FemaleIcon from "@mui/icons-material/Female";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MaleIcon from "@mui/icons-material/Male";
import {
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import PageLoader from "next/dist/client/page-loader";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getUserDetail, getUserPosts } from "../../apis/user_apis";
import PostAddModal from "../../components/Post/PostAddModal";
import PostCard from "../../components/Post/PostCard";
import UserDeleteModal from "../../components/User/UserDeleteModal";
import UserEditModal from "../../components/User/UserEditModal";
import { capitalizedWord } from "../../utils/utils";

export async function getServerSideProps(context) {
  const { usercode } = context.query;

  return {
    props: {
      usercode,
    },
  };
}

export default function UserDetail({ usercode }) {
  const router = useRouter();
  const [user, setUser] = React.useState(null);
  const [userPosts, setUserPosts] = React.useState(null);
  const [page, setPage] = React.useState(1);

  function getUserData() {
    getUserDetail(usercode)
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {});
  }

  function getPostsData() {
    getUserPosts(usercode, { page: page })
      .then((res) => {
        setUserPosts(res);
      })
      .catch(() => {});
  }

  React.useEffect(() => {
    getUserData();
  }, []);

  React.useEffect(() => {
    getPostsData();
  }, [page]);

  return (
    <Box mt={3}>
      <Breadcrumbs>
        <Link href={`/`}>
          <Typography fontSize={"0.9rem"}>
            <HomeOutlinedIcon fontSize="small" />
          </Typography>
        </Link>
        <Link href={`/users`}>
          <Typography fontSize={"0.9rem"}>Users</Typography>
        </Link>
        <Typography color={"text.dark"} fontSize={"0.9rem"}>
          #{user?.id}
        </Typography>
      </Breadcrumbs>
      {user && userPosts ? (
        <Box mt={3}>
          <Stack
            alignItems={"flex-start"}
            direction={"row"}
            flexWrap={"wrap"}
            gap={2}
            justifyContent={"space-between"}
          >
            <Stack>
              <Typography fontSize={"1.5rem"} fontWeight={500}>
                {user.name}{" "}
                {user.gender === "male" && (
                  <MaleIcon
                    fontSize="inherit"
                    sx={{ color: "#64b5f6", position: "relative", top: 5 }}
                  />
                )}
                {user.gender === "female" && (
                  <FemaleIcon
                    fontSize="inherit"
                    sx={{ color: "#f06292", position: "relative", top: 5 }}
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
                  fontSize={"0.9rem"}
                  sx={{
                    overflow: " hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.email}
                </Typography>
              </Stack>
              <Typography fontSize={"0.9rem"}>
                Status:{" "}
                <Typography
                  component={"span"}
                  fontSize={"0.9rem"}
                  fontWeight={500}
                  sx={{
                    color:
                      user.status === "active" ? "success.main" : "error.main",
                  }}
                >
                  {capitalizedWord(user.status)}
                </Typography>
              </Typography>
            </Stack>

            <Stack direction={"row"} gap={1}>
              <PostAddModal getData={getPostsData} iconBtn user={user} />
              <UserEditModal user={user} getUserData={getUserData} />
              <UserDeleteModal userId={user.id} />
            </Stack>
          </Stack>

          <Box mt={3}>
            <Typography fontSize={"1.5rem"} gutterBottom variant="h2">
              User&apos;s posts
            </Typography>
            {userPosts.data.length > 0 ? (
              <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2 }}>
                <Masonry>
                  {userPosts.data.map((item, index) => (
                    <PostCard key={index} post={item} />
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            ) : (
              <Typography>This user currently has no post</Typography>
            )}
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
