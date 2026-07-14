import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { AddAvatarResponse } from "@/types/AvatarTypes/addAvatarTypes";

export const addAvatar = createApiThunk<AddAvatarResponse, FormData>(
    "avatar/addAvatar",
    (formData) =>
        axios.post("/admin/avatars", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }),
);
