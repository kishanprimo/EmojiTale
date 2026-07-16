import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { DeleteStoryCategoryResponse } from "@/types/StoryCategoryTypes/storyCategoryTypes";

export const deleteStoryCategory = createApiThunk<DeleteStoryCategoryResponse, number>(
    "storyCategory/delete",
    (id) => axios.delete(`/story-category/delete/${id}`),
    "Failed to delete story category",
);
