import { createSlice } from "@reduxjs/toolkit";
import { fetchWeather } from "../thunks/weather";

// Define interfaces for the weather data
interface WeatherData {
    location: {
      name: string;
      country: string;
    };
    current: {
      temp_c: number;
      temp_f: number;
      condition: {
        text: string;
        icon: string;
      };
      humidity: number;
      wind_kph: number;
    };
  }

  interface WeatherState {
    data: WeatherData | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }

  const initialState: WeatherState = {
    data: null,
    status: "idle",
    error: null,
  };

// Weather Slice
const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});


export default weatherSlice.reducer;
