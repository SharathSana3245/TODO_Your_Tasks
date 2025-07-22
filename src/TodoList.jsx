// TodoList.jsx
import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { deleteTodo } from "./todoOpp";

const TodoList = ({ todos, onTodoRecords, onEdit }) => {
  if (!todos || todos.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" sx={{ my: 4 }}>
        No todos found. Add some tasks to get started!
      </Typography>
    );
  }

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      onTodoRecords(); // Refresh list
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <List
      sx={{ bgcolor: "background.paper", borderRadius: 2, boxShadow: 2, p: 2 }}
    >
      {todos.map((todo, index) => (
        <React.Fragment key={todo.id}>
          <ListItem
            alignItems="flex-start"
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  color="primary"
                  onClick={() => onEdit(todo)}
                  sx={{ mr: 1 }}
                >
                  ✏️
                </IconButton>
                <IconButton edge="end" onClick={() => handleDelete(todo.id)}>
                  <CloseIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={<Typography variant="h6">{todo.title}</Typography>}
              secondary={
                <Stack spacing={1}>
                  {todo.description && (
                    <Typography variant="body2" color="text.secondary">
                      {todo.description}
                    </Typography>
                  )}
                  <Stack direction="row" spacing={2}>
                    {todo.date && (
                      <Box display="flex" alignItems="center">
                        <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography variant="caption">{todo.date}</Typography>
                      </Box>
                    )}
                    {todo.time && (
                      <Box display="flex" alignItems="center">
                        <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography variant="caption">{todo.time}</Typography>
                      </Box>
                    )}
                  </Stack>
                </Stack>
              }
            />
          </ListItem>
          {index < todos.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default TodoList;
