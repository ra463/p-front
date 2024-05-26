import { createSlice } from "@reduxjs/toolkit";

const propertySlice = createSlice({
  name: "property",
  initialState: {
    properties: [],
    filteredPropertiesCount: 0,
    sellerProperties: [],
    property: {},
  },
  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload.properties;
      state.filteredPropertiesCount = action.payload.filteredPropertiesCount;
    },
    setSellerProperties: (state, action) => {
      state.sellerProperties = action.payload.sellerProperties;
    },
    setProperty: (state, action) => {
      state.property = action.payload.property;
    },
  },
});

export const { setProperties, setProperty, setSellerProperties } =
  propertySlice.actions;
export default propertySlice.reducer;
