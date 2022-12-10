import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import {
  Box,
  Breadcrumbs,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { postUser } from "../../apis/user_apis";

export default function AddUserPage() {
  const router = useRouter();
  const [sexValue, setSexValue] = React.useState("");
  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);

  function handleSelectSex(event) {
    setSexValue(event.target.value);
  }

  function handleCreateUser() {
    const p = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      gender: sexValue,
      status: Math.random() * 10 > 4 ? "active" : "inactive",
    };
    postUser(p)
      .then(() => {
        toast.success("Successfully created new user!");
        router.push(`/users`);
      })
      .catch(() => {
        toast.error("Something went wrong.");
      });
  }

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
          Add new user
        </Typography>
      </Breadcrumbs>
      <Typography fontSize={"1.5rem"} gutterBottom mt={1} variant="h2">
        Add New User
      </Typography>
      <Stack gap={2} sx={{ maxWidth: "30rem" }}>
        <TextField inputRef={nameRef} label="Name" type="text" />
        <TextField inputRef={emailRef} label="Email" type="email" />
        <FormControl>
          <InputLabel id="sex">Gender</InputLabel>
          <Select
            labelId="sex"
            label="Gender"
            onChange={handleSelectSex}
            value={sexValue}
          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Stack direction={"row"} gap={2} mt={3}>
        <Button onClick={handleCreateUser} variant="contained">
          Create User
        </Button>
        <Button onClick={() => router.back()}>Cancel</Button>
      </Stack>
    </Box>
  );
}
