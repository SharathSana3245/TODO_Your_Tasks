import { useEffect, useState } from "react";
import { Box, Button, Typography, Grid, useTheme, Paper } from "@mui/material";
import {
  Lightbulb,
  CheckCircle,
  Search,
  CalendarToday,
  Close as CloseIcon,
} from "@mui/icons-material";
import TodoList from "./Todolist";
import Todo from "./Todo";
import { getAllTodos } from "./todoOpp";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
    <Box display="flex" alignItems="center" mb={1}>
      <Icon color="primary" sx={{ fontSize: 30, mr: 1 }} />
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
    </Box>
    <Typography color="text.secondary">{description}</Typography>
  </Paper>
);

const HomePage = () => {
  const theme = useTheme();
  const [addTodoOpen, setAddTodoOpen] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const allTodos = await getAllTodos();
    setTodos(allTodos || []);
  };

  const handleOpenDialog = () => setAddTodoOpen(true);
  const handleCloseDialog = () => setAddTodoOpen(false);

  const handleTodoAdded = () => {
    fetchTodos();
    handleCloseDialog();
  };

  const refreshTodos = async () => {
    let todos = await getAllTodos();
    setTodos(todos);
  };

  return (
    <Box sx={{ px: 3, py: 6 }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Stay Organized. Anytime. Anywhere.
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          A simple, offline-first Todo App built with ❤️ using React, IndexedDB,
          and PWA.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ mt: 3 }}
          onClick={handleOpenDialog}
        >
          Start Adding Todos
        </Button>
      </Box>
      <Todo
        open={addTodoOpen}
        onClose={handleCloseDialog}
        refresh={refreshTodos}
      />
      {/* Todo List */}
      <Box mb={8}>
        <Typography variant="h5" fontWeight="medium" gutterBottom>
          Your Todos
        </Typography>
        <TodoList todos={todos} onTodoRecords={refreshTodos} />
      </Box>

      {/* Features Section */}
      <Typography variant="h5" fontWeight="medium" gutterBottom>
        Features
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={3}>
          <FeatureCard
            icon={CheckCircle}
            title="Offline First"
            description="Works perfectly without internet using IndexedDB and Service Workers."
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FeatureCard
            icon={Search}
            title="Filter & Search"
            description="Easily manage tasks with filters and search functionality."
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FeatureCard
            icon={CalendarToday}
            title="Smart Scheduling"
            description="Add due dates and categorize your tasks efficiently."
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FeatureCard
            icon={Lightbulb}
            title="Dark Mode"
            description="Supports full light and dark theme preferences."
          />
        </Grid>
      </Grid>

      {/* PWA Install Section */}
      <Box textAlign="center" mt={8}>
        <Typography variant="h5" gutterBottom>
          Install the App
        </Typography>
        <Typography color="text.secondary">
          Use it like a native app on your home screen.
        </Typography>
      </Box>

      {/* Footer */}
      <Box mt={10} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          Made with ❤️ by Sharath Kumar · Powered by React, Vite & IndexedDB
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
