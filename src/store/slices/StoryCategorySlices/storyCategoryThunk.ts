import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { StoryCategoryResponse } from "@/types/StoryCategoryTypes/storyCategoryTypes";

export const getStoryCategories = createApiThunk<
    StoryCategoryResponse,
    { page: number; limit: number }
>(
    "storyCategory/getStoryCategories",
    (payload) => axios.post("/story-category/all", payload),
);
