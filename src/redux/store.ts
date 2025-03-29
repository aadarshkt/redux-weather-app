import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slices/weather"
import searchReducer from "./slices/search"

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    search: searchReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch