import { useEffect } from "react";
import { useNotification } from "./NotificationContext";
import { getAllTodos } from "./todoOppBackend";

const ReminderChecker = () => {
  const { showNotification } = useNotification();

  useEffect(() => {
    const interval = setInterval(async () => {
      const todos = await getAllTodos();
      const now = new Date();
      const nowDate = now.toISOString().split("T")[0];
      const nowTime = now.toTimeString().slice(0, 5);

      todos.forEach((todo) => {
        if (todo.date === nowDate && todo.time === nowTime) {
          // Send Push Notification
          if (Notification.permission === "granted") {
            new Notification("Todo Reminder", {
              body: todo.title,
              icon: "/icon.png", // optional
            });
          }

          // App Snackbar Notification
          showNotification(`Reminder: ${todo.title}`, "info");

          // Update todo.notified = true in IndexedDB (optional)
        }
      });
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  return null; // This component is only for background check
};

export default ReminderChecker;
