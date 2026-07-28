import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getNotifications } from "../service/notification";
import { socket } from "../socket"
import { getToken } from "../cookies";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchNotifications = async () => {
        try {
            setLoading(true);

            const response = await getNotifications();

            if (response.success) {
                setNotifications(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     fetchNotifications();
    // }, []);
 const clearNotifications = () => {
    setNotifications([]);
};

    useEffect(() => {
        const token = getToken();

        if (!token) return;

        fetchNotifications();
    }, []);

    const unreadCount = useMemo(() => {
        return notifications.filter(
            (notification) => !notification.isRead
        ).length;
    }, [notifications]);



    useEffect(() => {
        console.log("NotificationContext Mounted");

        return () => {
            console.log("NotificationContext Unmounted");
        };
    }, []);




    useEffect(() => {
        socket.on("newNotification", (notification) => {
            console.log("Received notification:", notification);

            alert(notification.message);

            setNotifications((prev) => [notification, ...prev]);
        });

        return () => {
            socket.off("newNotification");
        };
    }, []);


    return (
        <NotificationContext.Provider
            value={{
                notifications,
                setNotifications,
                unreadCount,
                loading,
                fetchNotifications,
                clearNotifications,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    return useContext(NotificationContext);
};