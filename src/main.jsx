import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NotificationProvider } from "./components/NotificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
 <NotificationProvider>
    <App />
</NotificationProvider>
);