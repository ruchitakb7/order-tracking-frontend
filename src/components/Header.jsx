import { Bell, Package, LogOut, User, LayoutDashboard, } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getToken, getUser, clearAuth } from "../cookies";
import { useNotification } from "./NotificationContext";
import { socket } from "../socket";

function Header() {
  const navigate = useNavigate();
  const { unreadCount, clearNotifications } = useNotification();

  const token = getToken();
  const user = getUser();

  const handleLogout = () => {
    socket.disconnect();
    clearNotifications()
    clearAuth();
    navigate("/");
  };

  return (
    <header className="bg-gray-900 shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-white p-2">
            <Package className="h-5 w-5 text-gray-900" />
          </div>

          <div>
            <h1 className="text-lg font-bold text-white">
              Order Tracker
            </h1>

            <p className="text-xs text-gray-400">
              Real-Time Notifications
            </p>
          </div>
        </div>


        {/* <nav className="hidden gap-8 md:flex">
          <button
            onClick={() => navigate("/dashboard")}
            className="font-medium text-white"
          >
            Dashboard
          </button>

        </nav> */}

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-white transition hover:bg-gray-800"
        >
          <LayoutDashboard className="h-5 w-5" />
          <span className="hidden lg:block font-medium">
            Dashboard
          </span>
        </button>


        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/notifications")}
            className="relative rounded-lg p-2 transition hover:bg-gray-800"
          >
            <Bell className="h-5 w-5 text-white" />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {token && (
            <>
              <div className="flex items-center gap-3 rounded-xl bg-gray-800 px-3 py-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
                  <User className="h-5 w-5 text-gray-900" />
                </div>

                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-white">
                    {user?.name}
                  </p>

                  <p className="text-xs capitalize text-gray-400">
                    {user?.role}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-200"
              >
                <LogOut className="mr-2 inline h-4 w-4" />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;