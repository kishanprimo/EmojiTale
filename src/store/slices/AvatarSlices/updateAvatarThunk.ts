import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { UpdateAvatarPayload, UpdateAvatarResponse } from "@/types/AvatarTypes/updateAvatarTypes";

export const updateAvatar = createApiThunk<UpdateAvatarResponse, UpdateAvatarPayload>(
    "avatar/updateAvatar",
    ({ avatarId, formData }) =>
        axios.put(`/admin/avatars/${avatarId}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }),
    "Failed to update avatar",
);
