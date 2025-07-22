import React from "react";

import RemainderCheck from "./RemainderCheck";
import Home from "./HomePage";
import { NotificationProvider } from "./NotificationContext";

export default function App() {
  React.useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);
  return (
    <NotificationProvider>
      <div className="App">
        <RemainderCheck />
        <Home />
      </div>
    </NotificationProvider>
  );
}
