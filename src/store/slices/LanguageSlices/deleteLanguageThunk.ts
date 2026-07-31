import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { DeleteLanguageResponse } from "@/types/LanguageTypes/languageTypes";

export const deleteLanguage = createApiThunk<DeleteLanguageResponse, number>(
    "language/delete",
    (id) => axios.post(`/admin/language/${id}/delete`),
    "Failed to delete language",
);
