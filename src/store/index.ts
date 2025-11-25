import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import transportReducer from "./slices/transportSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transport: transportReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
