import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axiosConfiguration";
import { LoginPayload, LoginResponse } from "@/types/AuthTypes/loginTypes";

export const loginAdmin = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  {
    rejectValue: string;
  }
>(
  "auth/loginAdmin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/admin-auth/login",
        payload
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Login Failed"
      );
    }
  }
);