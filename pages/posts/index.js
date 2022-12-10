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
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { getAllPosts } from "../../apis/post_apis";
import PostAddModal from "../../components/Post/PostAddModal";
import PostCard from "../../components/Post/PostCard";

export async function getServerSideProps(context) {
  const { page } = context.query;
  const _page = page ?? 1;

  return {
    props: {
      page: _page,
    },
  };
}

export default function Posts({ page }) {
  const router = useRouter();
  const [posts, setPosts] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const handleChange = (event, value) => {
    router.push({
      pathname: `/posts`,
      query: {
        page: value,
      },
    });
  };

  function getData(page) {
    setLoading(true);
    getAllPosts({ page: page })
      .then((res) => {
        setPosts(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  React.useEffect(() => {
    getData(page);
  }, []);

  return (
    <Box mt={3}>
      <Breadcrumbs>
        <Link href={`/`}>
          <Typography fontSize={"0.9rem"}>
            <HomeOutlinedIcon fontSize="small" />
          </Typography>
        </Link>
        <Typography color={"text.dark"} fontSize={"0.9rem"}>
          Posts
        </Typography>
      </Breadcrumbs>
      {!loading ? (
        <div>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            mb={1}
            mt={1}
          >
            <Typography fontSize={"1.5rem"} variant="h2">
              Posts{" "}
              <Typography
                color={"text.main"}
                component="span"
                fontSize={"0.7rem"}
              >
                (showing {+page * +posts.headers["x-pagination-limit"] - 9}-
                {+page === +posts.headers["x-pagination-pages"]
                  ? posts.headers["x-pagination-total"]
                  : +page * +posts.headers["x-pagination-limit"]}{" "}
                of {posts.headers["x-pagination-total"]})
              </Typography>
            </Typography>
            <PostAddModal getData={getData} />
          </Stack>
          <Grid container spacing={2}>
            {posts.data.map((item, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <PostCard post={item} />
              </Grid>
            ))}
          </Grid>
          {+posts.headers["x-pagination-pages"] > 1 && (
            <Stack alignItems={"center"} mt={3}>
              <Pagination
                color="primary"
                count={+posts.headers["x-pagination-pages"]}
                onChange={handleChange}
                page={+page}
                shape="rounded"
              />
            </Stack>
          )}
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
