import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
 import Dashboard from "./components/Dashboard";
 import RegisterPage from "./components/Register";
 import Notifications from "./components/Notificationpage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;