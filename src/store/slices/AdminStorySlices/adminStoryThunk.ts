import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { AdminStoryPayload, AdminStoryResponse } from "@/types/AdminStoryTypes/adminStoryTypes";

export const getAdminStories = createApiThunk<AdminStoryResponse, AdminStoryPayload>(
    "adminStory/getAdminStories",
    (payload) => axios.post("/admin-story/all", payload),
);
