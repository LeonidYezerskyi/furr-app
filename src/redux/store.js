import { configureStore } from "@reduxjs/toolkit";
import doctorsReducer from "./slices/doctorsSlice";
import locationReducer from "./slices/locationSlice";

const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
    location: locationReducer,
  },
});

export default store;
