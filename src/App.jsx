import Todo from "./Todo";
import "./styles.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import React from "react";

import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export default function App() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    // const formData = new FormData(event.currentTarget);
    // const formJson = Object.fromEntries((formData as any).entries());
    // const email = formJson.email;
    // console.log(email);
    handleClose();
  };
  return (
    <div className="App">
      <nav>
        <Stack spacing={4} direction="row">
          <Button variant="text">Text</Button>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add Task
          </Button>
        </Stack>
      </nav>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #ddd",
            paddingY: 2,
            paddingX: 3,
          }}
        >
          Add Task
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <Todo />
        </DialogContent>
      </Dialog>

      {/* <Todo /> */}
    </div>
  );
}
