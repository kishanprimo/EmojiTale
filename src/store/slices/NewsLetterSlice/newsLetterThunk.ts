import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { NewsLetterPayload, NewsLetterResponse } from "@/types/NewsLetterTypes/newsLetterTypes";

export const getNewsLetters = createApiThunk<NewsLetterResponse, NewsLetterPayload>(
    "newsletter/getNewsLetters",
    (payload) => axios.post("/newsletter", payload),
);
