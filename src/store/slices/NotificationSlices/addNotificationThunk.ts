import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { CreateNotificationPayload } from "@/types/NotificationTypes/notificationTypes";

export const createNotification = createApiThunk<
    { success: boolean; message: string },
    CreateNotificationPayload
>(
    "addNotification/createNotification",
    (payload) => axios.post("/admin/notifications/broadcast", payload),
);
