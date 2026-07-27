import { useNotification } from "../components/NotificationContext";
import Header from "../components/Header"
import { Bell , CheckCircle2, } from "lucide-react"
import { useNavigate } from "react-router-dom";

import { markNotificationAsRead } from "../service/notification";



function Notification() {
    const { notifications, unreadCount, loading ,setNotifications } = useNotification();

    const navigate= useNavigate()

    const handleNotificationClick = async (notification) => {
        try {
            await markNotificationAsRead(notification._id);

            setNotifications((prev) =>
                prev.map((item) =>
                    item._id === notification._id
                        ? { ...item, isRead: true }
                        : item
                )
            );

            navigate("/dashboard");
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <Header />

            <div className="min-h-screen bg-gray-100 py-8">
                <div className="mx-auto max-w-3xl px-4">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">


                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Notifications
                                </h1>

                                <p className="text-sm text-gray-500">
                                    {unreadCount} unread notification
                                    {unreadCount !== 1 && "s"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="rounded-xl bg-white p-6 text-center shadow">
                            Loading notifications...
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="rounded-xl bg-white p-10 text-center shadow">
                            <Bell className="mx-auto mb-4 h-12 w-12 text-gray-300" />

                            <h2 className="text-lg font-semibold">
                                No Notifications
                            </h2>

                            <p className="mt-2 text-gray-500">
                                You're all caught up.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {notifications.map((notification) => (
                                <div
                                    key={notification._id}
                                     onClick={() => handleNotificationClick(notification)}
                                    className={`rounded-xl border p-5 shadow-sm transition hover:shadow-md ${notification.isRead
                                            ? "bg-white"
                                            : "border-blue-200 bg-blue-50"
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex gap-4">
                                            <div
                                                className={`mt-1 rounded-full p-2 ${notification.isRead
                                                        ? "bg-gray-100"
                                                        : "bg-blue-100"
                                                    }`}
                                            >
                                                <Bell
                                                    className={`h-5 w-5 ${notification.isRead
                                                            ? "text-gray-500"
                                                            : "text-blue-600"
                                                        }`}
                                                />
                                            </div>

                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {notification.message}
                                                </p>

                                                
                                            </div>
                                        </div>

                                        {!notification.isRead && (
                                            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                                                New
                                            </span>
                                        )}

                                        {notification.isRead && (
                                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Notification;