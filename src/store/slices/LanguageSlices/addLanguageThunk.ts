import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { AddLanguageResponse, LanguagePayload } from "@/types/LanguageTypes/languageTypes";

export const addLanguage = createApiThunk<AddLanguageResponse, LanguagePayload>(
    "addLanguage/addLanguage",
    (payload) => axios.post("/admin/language/create", payload),
    "Failed to create language",
);
