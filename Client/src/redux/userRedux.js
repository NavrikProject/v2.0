import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isFetching: false,
    currentUser: null,
    error: null,
  },

  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.currentUser = null;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.error = null;
      toast.success("You are successfully logging in you", {
        position: "top-center",
      });
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.currentUser = null;
      state.error = action.payload;
      toast.error("There is some error, please try again later", {
        position: "top-center",
      });
    },
    logOut: (state) => {
      state.isFetching = false;
      state.currentUser = null;
      state.error = null;
      toast.warning("You are successfully logged out", {
        position: "top-center",
      });
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logOut } =
  userSlice.actions;

export default userSlice.reducer;
