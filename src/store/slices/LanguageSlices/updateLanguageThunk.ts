import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { UpdateLanguageResponse, LanguagePayload } from "@/types/LanguageTypes/languageTypes";

export const updateLanguage = createApiThunk<
    UpdateLanguageResponse,
    { id: number; payload: Partial<LanguagePayload> }
>(
    "language/update",
    ({ id, payload }) => axios.post(`/admin/language/${id}/update`, payload),
    "Failed to update language",
);
