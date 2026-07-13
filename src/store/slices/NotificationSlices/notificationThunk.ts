import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axiosConfiguration";
import { NotificationResponse } from "@/types/NotificationTypes/notificationTypes";

export const getNotifications = createAsyncThunk<
    NotificationResponse,
    { page: number; limit: number },
    { rejectValue: string }
>(
    "notifications/getNotifications",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.get("/admin/notifications/broadcast", { params: payload });
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message;
            if (typeof message === "string") return rejectWithValue(message);
            return rejectWithValue("Something went wrong");
        }
    }
);
