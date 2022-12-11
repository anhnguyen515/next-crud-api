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
import { editPost } from "../../apis/post_apis";
import { editUser } from "../../apis/user_apis";

export default function PostEditModal({ post, getPostData }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const titleRef = React.useRef(null);
  const bodyRef = React.useRef(null);

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

  function handleEditPost() {
    setLoading(true);
    const p = {
      title: titleRef.current.value,
      body: bodyRef.current.value,
      user_id: post.user_id,
    };
    editPost(post.id, p)
      .then(() => {
        handleClose();
        setLoading(false);
        toast.success(`Successfully edited post #${post.id}.`);
        getPostData();
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
      <Tooltip arrow title="Edit post">
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
          {`Edit post #${post.id}`}
        </DialogTitle>
        <DialogContent>
          <Stack gap={2} mt={2}>
            <TextField
              defaultValue={post.title}
              fullWidth
              inputRef={titleRef}
              label="Title"
              type="text"
            />
            <TextField
              defaultValue={post.body}
              fullWidth
              inputRef={bodyRef}
              label="Body"
              minRows={3}
              multiline
              type="email"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <LoadingButton loading>Edit</LoadingButton>
          ) : (
            <>
              <Button color="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                autoFocus
                onClick={handleEditPost}
                startIcon={<EditOutlinedIcon />}
                variant="contained"
              >
                Edit
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
