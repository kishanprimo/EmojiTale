import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { GenerateStoryResponse } from "@/types/AdminStoryTypes/adminStoryTypes";

export const generateAdminStory = createApiThunk<GenerateStoryResponse, FormData>(
    "adminStory/generateAdminStory",
    (formData) =>
        axios.post("/admin-story/generate", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }),
);
