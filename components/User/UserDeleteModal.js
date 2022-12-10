import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { LoadingButton } from "@mui/lab";
import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "react-toastify";
import { deleteUser } from "../../apis/user_apis";

export default function UserDeleteModal({ userId }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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

  function handleDeleteUser() {
    setLoading(true);
    deleteUser(userId)
      .then(() => {
        handleClose();
        setLoading(false);
        toast.success(`Deleted user #${userId}.`);
        router.push(`/users`);
      })
      .catch(() => {
        toast.error("Something went wrong.");
        setLoading(false);
      })
      .finally(() => setTimeout(() => setLoading(false), 5000));
  }

  return (
    <div>
      <Tooltip arrow title="Delete user">
        <Button color="secondary" onClick={handleClickOpen} variant="outlined">
          <DeleteForeverOutlinedIcon />
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Permanently delete this user?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action will permanently delete this user. You can no longer
            retrieve this user&apos;s data
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <LoadingButton loading>Delete</LoadingButton>
          ) : (
            <>
              <Button color="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                autoFocus
                color="error"
                onClick={handleDeleteUser}
                startIcon={<DeleteForeverOutlinedIcon />}
                variant="contained"
              >
                Delete
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
