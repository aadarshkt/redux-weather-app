import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = "http://api.weatherapi.com/v1/current.json"


// Async Thunk for Fetching Weather Data
export const fetchWeather = createAsyncThunk(
    "weather/fetchWeather",
    async (city: string) => {
      const response = await axios.get(`${BASE_URL}?q=${city}&key=${API_KEY}&aqi=yes`);
      console.log(response.data)
      return response.data;
    }
  );

