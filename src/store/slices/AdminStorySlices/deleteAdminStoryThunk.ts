import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { DeleteAdminStoryResponse } from "@/types/AdminStoryTypes/adminStoryTypes";

export const deleteAdminStory = createApiThunk<DeleteAdminStoryResponse, number>(
    "adminStory/delete",
    (id) => axios.delete(`/admin-story/${id}`),
    "Failed to delete admin story",
);
