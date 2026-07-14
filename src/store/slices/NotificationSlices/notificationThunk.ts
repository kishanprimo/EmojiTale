import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { NotificationResponse } from "@/types/NotificationTypes/notificationTypes";

export const getNotifications = createApiThunk<
    NotificationResponse,
    { page: number; limit: number }
>(
    "notifications/getNotifications",
    (payload) => axios.get("/admin/notifications/broadcast", { params: payload }),
);
