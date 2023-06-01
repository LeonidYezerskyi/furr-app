import { createSlice } from "@reduxjs/toolkit";

const doctorsInitialState = {
  filteredDoctors: [],
  showAllDoctors: false,
  displayedDoctors: [],
  distance: {},
};

const doctorsSlice = createSlice({
  name: "doctors",
  initialState: doctorsInitialState,
  reducers: {
    setFilteredDoctors: (state, action) => {
      state.filteredDoctors = action.payload;
    },
    setShowAllDoctors: (state, action) => {
      state.showAllDoctors = action.payload;
    },
    setDisplayedDoctors: (state, action) => {
      state.displayedDoctors = action.payload;
    },
    setDistance: (state, action) => {
      state.distance = action.payload;
    },
  },
});

export const {
  setFilteredDoctors,
  setShowAllDoctors,
  setDisplayedDoctors,
  setDistance,
} = doctorsSlice.actions;

export default doctorsSlice.reducer;
