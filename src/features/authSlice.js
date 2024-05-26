import { createSlice } from "@reduxjs/toolkit";
const token = localStorage.getItem("token");
const firstName = localStorage.getItem("firstName");
const lastName = localStorage.getItem("lastName");
const email = localStorage.getItem("email");
const mobile = localStorage.getItem("mobile");
const role = localStorage.getItem("role");
const id = localStorage.getItem("id");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token,
    firstName: firstName,
    lastName: lastName,
    email: email,
    mobile: mobile,
    role: role,
    id: id,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.mobile = action.payload.mobile;
      state.role = action.payload.role;
      state.id = action.payload.id;
    },
    removeToken: (state, action) => {
      state.token = null;
      state.firstName = null;
      state.lastName = null;
      state.email = null;
      state.mobile = null;
      state.role = null;
      state.id = null;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
