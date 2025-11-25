import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../../types";
import { persistenceService } from "../../services/persistence/persistenceService";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      // Save token to persistence
      persistenceService.saveAuthToken(action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      // Clear all persisted data
      persistenceService.clearAll();
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setAuthState: (state, action: PayloadAction<{ user: User | null; token: string | null; isAuthenticated: boolean }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
});

export const { loginSuccess, logout, updateUser, setAuthState } = authSlice.actions;
export default authSlice.reducer;
