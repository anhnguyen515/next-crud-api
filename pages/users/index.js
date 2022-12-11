import CloseIcon from "@mui/icons-material/Close";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Breadcrumbs,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getAllUsers } from "../../apis/user_apis";
import UserSkeleton from "../../components/Skeleton/UserSkeleton";
import UserAddModal from "../../components/User/UserAddModal";
import UserCard from "../../components/User/UserCard";

export default function Users() {
  const [users, setUsers] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [triggerEffect, setTriggerEffect] = React.useState("");

  function handleChangeQuery(event) {
    setTriggerEffect("query" + event.target.value);
    setQuery(event.target.value);
    setPage(1);
  }

  function handleChangePage(event, value) {
    setTriggerEffect("page" + value);
    setPage(value);
  }

  function getData(page, query) {
    setLoading(true);
    getAllUsers({ page: page, name: query })
      .then((res) => {
        setUsers(res);
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
          Users
        </Typography>
      </Breadcrumbs>
      <Stack direction={"row"} justifyContent={"space-between"} mb={1} mt={3}>
        <Typography fontSize={"1.5rem"} variant="h2">
          Users{" "}
          {users && users.data.length > 1 ? (
            <Typography
              color={"text.main"}
              component="span"
              fontSize={"0.7rem"}
            >
              (showing {page * +users?.headers["x-pagination-limit"] - 9}-
              {page === +users?.headers["x-pagination-pages"]
                ? users?.headers["x-pagination-total"]
                : page * +users?.headers["x-pagination-limit"]}{" "}
              of {users?.headers["x-pagination-total"]} results )
            </Typography>
          ) : (
            <Typography
              color={"text.main"}
              component="span"
              fontSize={"0.7rem"}
            >
              (showing {users?.headers["x-pagination-total"]} of{" "}
              {users?.headers["x-pagination-total"]} result)
            </Typography>
          )}
        </Typography>
        <UserAddModal getData={getData} />
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
                    setQuery("");
                    setPage(1);
                    setTriggerEffect("");
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
              {users.data.map((item, index) => (
                <UserCard key={index} user={item} />
              ))}
            </Masonry>
          </ResponsiveMasonry>
          {+users.headers["x-pagination-pages"] > 1 && (
            <Stack alignItems={"center"} mt={3}>
              <Pagination
                color="primary"
                count={+users.headers["x-pagination-pages"]}
                onChange={handleChangePage}
                page={+page}
                shape="rounded"
              />
            </Stack>
          )}
        </Stack>
      ) : (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2 }}>
          <Masonry gutter="1rem">
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
            <UserSkeleton />
          </Masonry>
        </ResponsiveMasonry>
      )}
    </Box>
  );
}
