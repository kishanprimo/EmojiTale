import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { UpdateAdminStoryResponse } from "@/types/AdminStoryTypes/adminStoryTypes";

export const updateAdminStory = createApiThunk<UpdateAdminStoryResponse, { id: number; formData: FormData }>(
    "adminStory/update",
    ({ id, formData }) =>
        axios.put(`/admin-story/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }),
    "Failed to update admin story",
);
