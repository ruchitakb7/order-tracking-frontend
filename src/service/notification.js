import api from "../axios";
import { getToken } from "../cookies";

export const getNotifications = async () => {
    const token = getToken();

    const response = await api.get("/notifications", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};



export const markNotificationAsRead = async (notificationId) => {

    const response = await api.patch(`/notifications/${notificationId}/read`);

    return response.data;
};