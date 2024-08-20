import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice.js";
import testSlice from "./features/testsSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    tests: testSlice,
  },
});
