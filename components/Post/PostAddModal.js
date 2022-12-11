import PostAddIcon from "@mui/icons-material/PostAdd";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Stack, TextField, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "react-toastify";
import { postPost } from "../../apis/post_apis";
import { getAllUsers } from "../../apis/user_apis";

export default function PostAddModal({ getData, iconBtn, user }) {
  const router = useRouter();
  const page = router.query.page ?? 1;
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [searchUsers, setSearchUsers] = React.useState([]);

  const [value, setValue] = React.useState(user || searchUsers[0]);
  const [inputValue, setInputValue] = React.useState("");

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

  function handleCreatePost() {
    setLoading(true);
    const p = {
      title: titleRef.current.value,
      body: bodyRef.current.value,
      user_id: value.id,
    };
    postPost(p)
      .then(() => {
        handleClose();
        setLoading(false);
        toast.success(`Successfully created new post!`);
        if (+page > 1) {
          router.push(`/posts`);
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

  React.useEffect(() => {
    const timer = setTimeout(() => {
      getAllUsers({ per_page: 100, name: inputValue }).then((res) => {
        setSearchUsers(res.data);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <div>
      {!iconBtn ? (
        <Button
          onClick={handleClickOpen}
          startIcon={<PostAddIcon />}
          sx={{ textTransform: "none" }}
        >
          Add New Post
        </Button>
      ) : (
        <Tooltip arrow title="Add post">
          <Button
            color={"secondary"}
            onClick={handleClickOpen}
            sx={{ textTransform: "none" }}
            variant={"outlined"}
          >
            <PostAddIcon />
          </Button>
        </Tooltip>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Create new post`}</DialogTitle>
        <DialogContent>
          <Stack gap={2} mt={2}>
            <TextField
              fullWidth
              inputRef={titleRef}
              label="Title"
              type="text"
            />
            <TextField
              fullWidth
              inputRef={bodyRef}
              multiline
              minRows={3}
              label="Body"
              type="text"
            />
            <Autocomplete
              disabled={user}
              disableClearable
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              options={searchUsers}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} label="User" />}
            />
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
                onClick={handleCreatePost}
                startIcon={<PostAddIcon />}
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
