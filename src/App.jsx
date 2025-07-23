import React from "react";

import RemainderCheck from "./RemainderCheck";
import HomePage from "./HomePage";
import { NotificationProvider } from "./NotificationContext";
import { ThemeProvider } from "./ThemeContainer";
import { AuthProvider } from "./utils/AuthContext";

export default function App() {
  React.useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);
  return (
    <AuthProvider>
       <NotificationProvider>
      <ThemeProvider>
        <div className="App">
          <RemainderCheck />
          <HomePage />
        </div>
      </ThemeProvider>
    </NotificationProvider>
    </AuthProvider>
   
  );
}
