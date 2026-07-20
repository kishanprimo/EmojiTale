import axios from "@/lib/axiosConfiguration";
import { createApiThunk } from "@/store/createApiThunk";
import { UserViewResponse } from "@/types/UserTypes/userViewTypes";

export const getUserById = createApiThunk<UserViewResponse, number>(
    "userView/getUserById",
    (id) => axios.get(`/admin/users/${id}`),
);
