import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axiosConfiguration";

import {
    MemberPayload,
    MemberResponse,
} from "@/types/UserTypes/memberTypes";

export const getMembers = createAsyncThunk<
    MemberResponse,
    MemberPayload,
    {
        rejectValue: string;
    }
>(
    "members/getMembers",

    async (payload, { rejectWithValue }) => {

        try {

            const response = await axios.post(
                "/admin/users/members",
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