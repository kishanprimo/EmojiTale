import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { LanguageListResponse } from "@/types/LanguageTypes/languageTypes";

export const getLanguages = createApiThunk<
    LanguageListResponse,
    { page: number; limit: number; search?: string }
>(
    "language/getLanguages",
    (payload) => axios.post("/admin/language/all", payload),
);
