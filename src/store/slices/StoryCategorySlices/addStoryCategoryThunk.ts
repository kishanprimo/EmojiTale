import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { AddStoryCategoryResponse } from "@/types/StoryCategoryTypes/storyCategoryTypes";

export const addStoryCategory = createApiThunk<AddStoryCategoryResponse, FormData>(
    "addStoryCategory/addStoryCategory",
    (formData) =>
        axios.post("/story-category/create", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }),
);
