import CloseIcon from "@mui/icons-material/Close";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getAllPosts } from "../../apis/post_apis";
import PostAddModal from "../../components/Post/PostAddModal";
import PostCard from "../../components/Post/PostCard";
import PostSkeleton from "../../components/Skeleton/PostSkeleton";

export default function Posts() {
  const [posts, setPosts] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [query, setQuery] = React.useState("");
  const [triggerEffect, setTriggerEffect] = React.useState("");

  const handleChange = (event, value) => {
    setTriggerEffect("page" + value);
    setPage(value);
  };

  function handleChangeQuery(event) {
    setTriggerEffect("query" + event.target.value);
    setQuery(event.target.value);
    setPage(1);
  }

  function getData(page, query) {
    setLoading(true);
    getAllPosts({ page: page, title: query })
      .then((res) => {
        console.log(res);
        setPosts(res);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  React.useEffect(() => {
    let timer;
    if (triggerEffect.includes("query")) {
      timer = setTimeout(() => {
        getData(page, query);
      }, 500);
    } else {
      getData(page, query);
    }

    return () => clearTimeout(timer);
  }, [triggerEffect]);

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
      <Stack direction={"row"} justifyContent={"space-between"} mb={1} mt={3}>
        <Typography fontSize={"1.5rem"} variant="h2">
          Posts{" "}
          {posts && posts.data.length > 1 ? (
            <Typography
              color={"text.main"}
              component="span"
              fontSize={"0.7rem"}
            >
              (showing {page * +posts?.headers["x-pagination-limit"] - 9}-
              {page === +posts?.headers["x-pagination-pages"]
                ? posts?.headers["x-pagination-total"]
                : page * +posts?.headers["x-pagination-limit"]}{" "}
              of {posts?.headers["x-pagination-total"]} results )
            </Typography>
          ) : (
            <Typography
              color={"text.main"}
              component="span"
              fontSize={"0.7rem"}
            >
              (showing {posts?.headers["x-pagination-total"]} of{" "}
              {posts?.headers["x-pagination-total"]} result)
            </Typography>
          )}
        </Typography>
        <PostAddModal getData={getData} />
      </Stack>
      <TextField
        onChange={handleChangeQuery}
        size="small"
        sx={{ mt: 2, mb: 3 }}
        value={query}
        variant="standard"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="inherit" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {query !== "" && (
                <CloseIcon
                  fontSize="inherit"
                  onClick={() => {
                    setTriggerEffect("");
                    setQuery("");
                    setPage(1);
                  }}
                  sx={{ cursor: "pointer" }}
                />
              )}
            </InputAdornment>
          ),
          sx: {
            fontSize: "0.9rem",
          },
        }}
      />
      {!loading ? (
        <Stack>
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2 }}>
            <Masonry gutter="1rem">
              {posts?.data.map((item, index) => (
                <PostCard key={index} post={item} />
              ))}
            </Masonry>
          </ResponsiveMasonry>
          {+posts?.headers["x-pagination-pages"] > 1 && (
            <Stack alignItems={"center"} mt={3}>
              <Pagination
                color="primary"
                count={+posts?.headers["x-pagination-pages"]}
                onChange={handleChange}
                page={+page}
                shape="rounded"
              />
            </Stack>
          )}
        </Stack>
      ) : (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2 }}>
          <Masonry gutter="1rem">
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </Masonry>
        </ResponsiveMasonry>
      )}
    </Box>
  );
}
