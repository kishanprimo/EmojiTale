import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { ThemePayload, ThemeResponse } from "@/types/ThemeTypes/themeTypes";

export const getThemes = createApiThunk<ThemeResponse, ThemePayload>(
    "themes/getThemes",
    (payload) => axios.get("/admin/themes", { params: payload }),
);
