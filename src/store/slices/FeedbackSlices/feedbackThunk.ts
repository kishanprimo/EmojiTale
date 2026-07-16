import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { FeedbackResponse } from "@/types/FeedbackTypes/feedbackTypes";

export const getFeedbacks = createApiThunk<FeedbackResponse, { page: number; limit: number }>(
    "feedback/getFeedbacks",
    (payload) => axios.get("/admin/feedback", { params: payload }),
);
