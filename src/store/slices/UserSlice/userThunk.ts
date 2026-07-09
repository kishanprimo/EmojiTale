import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axiosConfiguration";

import {
    UserPayload,
    UserResponse,
} from "@/types/UserTypes/userTypes";

export const getUsers = createAsyncThunk<
    UserResponse,
    UserPayload,
    {
        rejectValue: string;
    }
>(
    "users/getUsers",

    async (payload, { rejectWithValue }) => {
         console.log("Users API Called");
        try {
            const response = await axios.post(
                "/admin/users",
                payload
            );

            return response.data;

        } catch (error: any) {

            const message = error.response?.data?.message;

            if (typeof message === "string") {
                return rejectWithValue(message);
            }

            return rejectWithValue("Something went wrong");
        }
    }
);