
import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { RetranslateLanguageResponse } from "@/types/LanguageTypes/languageTypes";
 
export const retranslateLanguage = createApiThunk<
    RetranslateLanguageResponse,
    { id: number; overwrite?: boolean }
>(
    "language/retranslate",
    ({ id, overwrite }) =>
        axios.post(`/admin/language/${id}/retranslate`, { overwrite: overwrite ?? false }),
    "Failed to start re-translation",
);