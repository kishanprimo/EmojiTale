import { createSlice } from "@reduxjs/toolkit";
import { getPlans } from "./planThunk";

import {
  PlanItem,
  PlanPagination,
} from "@/types/PlanTypes/planTypes";

interface PlanState {
  plans: PlanItem[];
  pagination: PlanPagination;
  loading: boolean;
  error: string | null;
}

const initialState: PlanState = {
  plans: [],

  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  },

  loading: false,

  error: null,
};

const planSlice = createSlice({
  name: "plans",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload.data.records;
        state.pagination = action.payload.data.pagination;
      })

      .addCase(getPlans.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Something went wrong";
      });
  },
});

export default planSlice.reducer;