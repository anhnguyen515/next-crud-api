import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "react-toastify";
import { postUser } from "../../apis/user_apis";

export default function UserAddModal({ getData }) {
  const router = useRouter();
  const page = router.query.page ?? 1;
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [sexValue, setSexValue] = React.useState("");
  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);

  function handleSelectSex(event) {
    setSexValue(event.target.value);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason && reason == "backdropClick" && loading) {
      return;
    } else {
      setOpen(false);
    }
  };

  function handleCreateUser() {
    setLoading(true);
    const p = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      gender: sexValue,
      status: Math.random() * 10 > 4 ? "active" : "inactive",
    };
    postUser(p)
      .then(() => {
        handleClose();
        setLoading(false);
        toast.success(`Successfully created new user!`);
        if (+page > 1) {
          router.push(`/users`);
        } else {
          getData(1);
        }
      })
      .catch(() => {
        toast.error("Something went wrong.");
        setLoading(false);
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 5000);
      });
  }

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        startIcon={<PersonAddAltRoundedIcon />}
        sx={{ textTransform: "none" }}
      >
        Add New User
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Create new user`}</DialogTitle>
        <DialogContent>
          <Stack gap={2} mt={2}>
            <TextField fullWidth inputRef={nameRef} label="Name" type="text" />
            <TextField
              fullWidth
              inputRef={emailRef}
              label="Email"
              type="email"
            />
            <FormControl fullWidth>
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
        </DialogContent>
        <DialogActions>
          {loading ? (
            <LoadingButton loading>Create</LoadingButton>
          ) : (
            <>
              <Button color="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                autoFocus
                onClick={handleCreateUser}
                startIcon={<PersonAddAltRoundedIcon />}
                variant="contained"
              >
                Create
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
