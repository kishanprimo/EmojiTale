import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { AddThemeResponse } from "@/types/ThemeTypes/themeFormTypes";

export const addTheme = createApiThunk<AddThemeResponse, FormData>(
    "theme/addTheme",
    (formData) =>
        axios.post("/admin/themes", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }),
);
