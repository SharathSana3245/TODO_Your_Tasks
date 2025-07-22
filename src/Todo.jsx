import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Stack,
} from "@mui/material";
import { useState, useEffect } from "react";
import { addTodo, updateTodo } from "./todoOpp";
import { useNotification } from "./NotificationContext";

const Todo = ({ open, onClose, refresh, editData }) => {
  const { showNotification } = useNotification();
  const [todo, setTodo] = useState(
    editData || {
      title: "",
      description: "",
      date: "",
      time: "",
    }
  );

  useEffect(() => {
    if (editData) setTodo(editData);
  }, [editData]);

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const finalData = { ...todo, id: editData?.id || Date.now() };

    try {
      editData ? await updateTodo(finalData) : await addTodo(finalData);
      editData
        ? showNotification("Todo Updated!", "success")
        : showNotification("Todo saved!", "success");
      refresh();
      onClose();
      setTodo({ title: "", description: "", date: "", time: "" });
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{editData ? "Edit Todo" : "Add Todo"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            name="title"
            label="Title"
            value={todo.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="description"
            label="Description"
            multiline
            rows={3}
            value={todo.description}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            type="date"
            name="date"
            value={todo.date}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            type="time"
            name="time"
            value={todo.time}
            onChange={handleChange}
            fullWidth
          />
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={onClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="contained">
              {editData ? "Update" : "Add"}
            </Button>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default Todo;
