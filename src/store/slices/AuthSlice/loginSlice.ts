import { createSlice } from "@reduxjs/toolkit";
import { loginAdmin } from "./loginThunk";
import { LoginState } from "@/types/AuthTypes/loginTypes";
import Cookies from "js-cookie";
const initialState: LoginState = {
  loading: false,
  error: null,
  token: null,
  admin: null,
};

const loginSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout(state) {
      state.token = null;
      state.admin = null;

      Cookies.remove("emotale_admin_token");
      localStorage.removeItem("emotale_admin");
    },
  },

  extraReducers(builder) {
    builder

      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;

        state.token = action.payload.data.token;
        state.admin = action.payload.data.admin;

        Cookies.set(
          "emotale_admin_token",
          action.payload.data.token,
          {
            expires: 30,
            sameSite: "Strict",
            secure: process.env.NODE_ENV === "production",
          }
        );

        localStorage.setItem(
          "emotale_admin",
          JSON.stringify(action.payload.data.admin)
        );

      })

      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Login Failed";
      });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;