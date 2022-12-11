import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FemaleIcon from "@mui/icons-material/Female";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MaleIcon from "@mui/icons-material/Male";
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
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
  const [user, setUser] = React.useState(null);
  const [userPosts, setUserPosts] = React.useState(null);
  const [postLoading, setPostLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);

  function handleChangePage(event, value) {
    setPage(value);
  }

  function getUserData() {
    getUserDetail(usercode)
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {});
  }

  function getPostsData() {
    setPostLoading(true);
    getUserPosts(usercode, { page: page })
      .then((res) => {
        setUserPosts(res);
        setPostLoading(false);
      })
      .catch(() => {
        setPostLoading(false);
      });
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
            {!postLoading ? (
              <Box>
                {userPosts.data.length > 0 ? (
                  <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2 }}
                  >
                    <Masonry gutter="1rem">
                      {userPosts.data.map((item, index) => (
                        <PostCard key={index} post={item} />
                      ))}
                    </Masonry>
                  </ResponsiveMasonry>
                ) : (
                  <Typography>This user currently has no post</Typography>
                )}
              </Box>
            ) : (
              <Typography>Loading...</Typography>
            )}
          </Box>
          {+userPosts.headers["x-pagination-pages"] > 1 && (
            <Stack alignItems={"center"} mt={3}>
              <Pagination
                color="primary"
                count={+userPosts.headers["x-pagination-pages"]}
                onChange={handleChangePage}
                page={page}
                shape="rounded"
              />
            </Stack>
          )}
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
