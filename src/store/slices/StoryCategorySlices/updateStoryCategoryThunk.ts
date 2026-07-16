import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { UpdateStoryCategoryResponse } from "@/types/StoryCategoryTypes/storyCategoryTypes";

export const updateStoryCategory = createApiThunk<UpdateStoryCategoryResponse, { id: number; formData: FormData }>(
    "storyCategory/update",
    ({ id, formData }) =>
        axios.put(`/story-category/update/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }),
    "Failed to update story category",
);
