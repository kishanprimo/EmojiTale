import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axiosConfiguration";
import { NewsLetterPayload, NewsLetterResponse } from "@/types/NewsLetterTypes/newsLetterTypes";

export const getNewsLetters = createAsyncThunk<
    NewsLetterResponse,
    NewsLetterPayload,
    { rejectValue: string }
>(
    "newsletter/getNewsLetters",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post("/newsletter", payload);
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message;
            if (typeof message === "string") return rejectWithValue(message);
            return rejectWithValue("Something went wrong");
        }
    }
);
