import React from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { openDB, getTodos } from "./todoOpp";

const DB_STORE_NAME = "todos";

function Todo() {
  const today = new Date().toISOString().split("T")[0];
  const [minTime, setMinTime] = React.useState("");
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState({
    title: "",
    description: "",
    time: "",
    date: "",
  });

  const fetchTodos = async () => {
    try {
      const allTodos = await getTodos();
      setTodos(allTodos);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  React.useEffect(() => {
    fetchTodos();
  }, []);

  const onChangeEvent = (e) => {
    if (e.target.name === "date") {
      const selectedDate = new Date(e.target.value).toDateString();
      const currentDate = new Date().toDateString();
      if (selectedDate === currentDate) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        setMinTime(`${hours}:${minutes}`);
      } else {
        setMinTime("");
      }
    }
    setTodo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addTask = async () => {
    const { title, description, date, time } = todo;
    if (!title || !description || !date || !time) {
      alert("Please fill all fields correctly");
      return;
    }

    const newTodo = { ...todo, id: Date.now() };

    try {
      const db = await openDB();
      const tx = db.transaction(DB_STORE_NAME, "readwrite");
      const store = tx.objectStore(DB_STORE_NAME);
      const request = store.add(newTodo);

      request.onsuccess = () => {
        setTodo({ title: "", description: "", date: "", time: "" });
        fetchTodos();
      };

      request.onerror = () => {
        console.error("Failed to add todo");
      };
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteRecord = async (id) => {
    const db = await openDB();
    const tx = db.transaction(DB_STORE_NAME, "readwrite");
    const store = tx.objectStore(DB_STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = async () => {
      await fetchTodos();
    };

    request.onerror = () => {
      console.error("Failed to delete todo");
    };
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Add New Task
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          marginBottom: 3,
        }}
      >
        <TextField
          label="Title"
          name="title"
          value={todo.title}
          onChange={onChangeEvent}
          fullWidth
        />
        <TextField
          label="Description"
          name="description"
          value={todo.description}
          onChange={onChangeEvent}
          fullWidth
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          value={todo.date}
          inputProps={{ min: today }}
          onChange={onChangeEvent}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          key={minTime}
          label="Time"
          name="time"
          type="time"
          value={todo.time}
          inputProps={{ min: minTime }}
          onChange={onChangeEvent}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" color="primary" onClick={addTask}>
          Add Task
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>
        Todo List
      </Typography>

      <Paper elevation={2}>
        <List>
          {todos.length === 0 ? (
            <ListItem>
              <ListItemText primary="No todos available" />
            </ListItem>
          ) : (
            todos.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton edge="end" onClick={() => deleteRecord(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={item.title}
                  secondary={`${item.description} on ${item.date} at ${item.time}`}
                />
              </ListItem>
            ))
          )}
        </List>
      </Paper>
    </Box>
  );
}

export default Todo;
