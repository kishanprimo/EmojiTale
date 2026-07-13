import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axiosConfiguration";
import { CreateNotificationPayload } from "@/types/NotificationTypes/notificationTypes";

export const createNotification = createAsyncThunk<
    { success: boolean; message: string },
    CreateNotificationPayload,
    { rejectValue: string }
>(
    "addNotification/createNotification",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post("/admin/notifications/broadcast", payload);
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message;
            if (typeof message === "string") return rejectWithValue(message);
            return rejectWithValue("Something went wrong");
        }
    }
);
