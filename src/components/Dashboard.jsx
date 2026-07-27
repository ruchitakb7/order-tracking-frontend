

import { useEffect } from "react";
import Header from "../components/Header";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import { getUser } from "../cookies";
import { socket } from "../socket";

function Dashboard() {
  const user = getUser();

  useEffect(() => {
    if (!user) return;

    if (!socket.connected) {
      socket.connect();
    }

    const handleConnect = () => {
      console.log("Connected:", socket.id);

      socket.emit("join", user.id); // or user._id depending on your cookie
    };

    socket.on("connect", handleConnect);

    // If already connected (e.g. navigating without refresh)
    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-7xl mx-auto p-6">
        {user?.role === "admin" ? (
          <AdminDashboard />
        ) : (
          <UserDashboard />
        )}
      </main>
    </div>
  );
}

export default Dashboard;