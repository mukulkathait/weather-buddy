import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface AuthStateInterface {
  status: boolean;
  token: string | null;
}

const initialState: AuthStateInterface = {
  status: false,
  token: null,
};

interface LoginPayload {
  token: string;
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.status = true;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.status = false;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectToken = (state: RootState) => state.auth.token;
export default authSlice.reducer;
