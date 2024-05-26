import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import propertySlice from "./propertySlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    property: propertySlice,
  },
});
