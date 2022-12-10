import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
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
import { getAllUsers } from "../../apis/user_apis";
import UserAddModal from "../../components/User/UserAddModal";
import UserCard from "../../components/User/UserCard";

export async function getServerSideProps(context) {
  const { page } = context.query;
  const _page = page ?? 1;

  return {
    props: {
      page: _page,
    },
  };
}

export default function Users({ page }) {
  const router = useRouter();
  const [users, setUsers] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  console.log(users?.headers);

  function handleChangePage(event, value) {
    router.push({
      pathname: `/users`,
      query: {
        page: value,
      },
    });
  }

  function getData(page) {
    setLoading(true);
    getAllUsers({ page: page })
      .then((res) => {
        setUsers(res);
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
          Users
        </Typography>
      </Breadcrumbs>
      {!loading ? (
        <Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            mb={1}
            mt={1}
          >
            <Typography fontSize={"1.5rem"} variant="h2">
              Users{" "}
              <Typography
                color={"text.main"}
                component="span"
                fontSize={"0.7rem"}
              >
                (showing {+page * +users.headers["x-pagination-limit"] - 9}-
                {+page === +users.headers["x-pagination-pages"]
                  ? users.headers["x-pagination-total"]
                  : +page * +users.headers["x-pagination-limit"]}{" "}
                of {users.headers["x-pagination-total"]})
              </Typography>
            </Typography>
            <UserAddModal getData={getData} />
          </Stack>
          <Grid container spacing={2}>
            {users.data.map((item, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <UserCard user={item} />
              </Grid>
            ))}
          </Grid>
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
