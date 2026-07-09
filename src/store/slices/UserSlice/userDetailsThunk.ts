import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axiosConfiguration";

import {
    UserDetailsPayload,
    UserDetailsResponse,
} from "@/types/UserTypes/userDetailsTypes";

export const getUserDetails = createAsyncThunk<
    UserDetailsResponse,
    UserDetailsPayload,
    {
        rejectValue: string;
    }
>(
    "userDetails/getUserDetails",

    async (payload, { rejectWithValue }) => {
         console.log("Users Details API Called");
        try {

            const response = await axios.post(
                "/admin/user-details",
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