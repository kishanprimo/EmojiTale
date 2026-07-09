// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "@/lib/axiosConfiguration";

// import { DashboardResponse } from "@/types/DashboardTypes/liveusers_types";

// export const getDashboard = createAsyncThunk<
//     DashboardResponse,
//     void,
//     {
//         rejectValue: string;
//     }
// >(
//     "dashboard/getDashboard",

//     async (_, { rejectWithValue }) => {
//         console.log("Dashboard API Called");
//         try {
//             const response = await axios.get("/admin/dashboard");

//             return response.data;
//         } catch (error: any) {
//             const message = error.response?.data?.message;

//             if (typeof message === "string") {
//                 return rejectWithValue(message);
//             }

//             return rejectWithValue("Something went wrong");
//         }
//     }
// );