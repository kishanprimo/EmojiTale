import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axiosConfiguration";

import {
  PlanPayload,
  PlanResponse,
} from "@/types/PlanTypes/planTypes";

export const getPlans = createAsyncThunk<
  PlanResponse,
  PlanPayload,
  {
    rejectValue: string;
  }
>(
  "plans/getPlans",

  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/admin/xp-store",
        payload
      );

      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message;

      if (typeof message === "string") {
        return rejectWithValue(message);
      }

      return rejectWithValue("Something went wrong");
    }
  }
);