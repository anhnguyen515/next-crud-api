import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { toast } from "react-toastify";
import { editUser } from "../../apis/user_apis";

export default function UserEditModal({ user }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [sexValue, setSexValue] = React.useState(user.gender);
  const [checkActive, setCheckActive] = React.useState(
    user.status === "active" ? true : false
  );

  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);

  function handleSelectSex(event) {
    setSexValue(event.target.value);
  }

  function handleSwitchStatus(event) {
    setCheckActive(event.target.checked);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason && reason == "backdropClick") {
      return;
    } else {
      setOpen(false);
    }
  };

  function handleEditUser() {
    setLoading(true);
    const p = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      gender: sexValue,
      status: checkActive ? "active" : "inactive",
    };
    editUser(user.id, p)
      .then(() => {
        handleClose();
        setLoading(false);
        toast.success(`Successfully edited user #${user.id}.`);
        window.location.href = `/users/${user.id}`;
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
      <Tooltip arrow title="Edit user">
        <Button color="secondary" onClick={handleClickOpen} variant="outlined">
          <EditOutlinedIcon />
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Edit user #${user.id}`}
        </DialogTitle>
        <DialogContent>
          <Stack gap={2} mt={2}>
            <TextField
              defaultValue={user.name}
              fullWidth
              inputRef={nameRef}
              label="Name"
              type="text"
            />
            <TextField
              defaultValue={user.email}
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
            <Stack alignItems={"center"} direction={"row"} gap={1}>
              <Typography color={!checkActive ? "error.main" : "text.main"}>
                Inactive
              </Typography>
              <Switch
                checked={checkActive}
                onChange={handleSwitchStatus}
                size="small"
              />
              <Typography color={checkActive ? "success.main" : "text.main"}>
                Active
              </Typography>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <LoadingButton loading>Edit</LoadingButton>
          ) : (
            <>
              <Button onClick={handleClose}>Cancel</Button>
              <Button autoFocus onClick={handleEditUser} variant="contained">
                Edit
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
