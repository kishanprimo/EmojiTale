import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { PopularAuthorResponse } from "@/types/PopularAuthorTypes/popularAuthorTypes";

export const getPopularAuthors = createApiThunk<PopularAuthorResponse, { page: number; limit: number }>(
    "popularAuthors/getPopularAuthors",
    (payload) => axios.get("/admin/most-popular-authors", { params: payload }),
);
