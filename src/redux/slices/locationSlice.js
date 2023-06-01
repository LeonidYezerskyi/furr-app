import { createSlice } from "@reduxjs/toolkit";

const locationInitialState = {
  currentLocation: null,
  selectedDate: "today",
};

const locationSlice = createSlice({
  name: "location",
  initialState: locationInitialState,
  reducers: {
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setCurrentLocation, setSelectedDate } = locationSlice.actions;

export default locationSlice.reducer;
