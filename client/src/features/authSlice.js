import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    signout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { signin, signout } = authSlice.actions;

export default authSlice.reducer;
