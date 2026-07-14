import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { UpdateThemePayload, UpdateThemeResponse } from "@/types/ThemeTypes/themeFormTypes";

export const updateTheme = createApiThunk<UpdateThemeResponse, UpdateThemePayload>(
    "theme/updateTheme",
    ({ themeId, formData }) =>
        axios.put(`/admin/themes/${themeId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }),
);
