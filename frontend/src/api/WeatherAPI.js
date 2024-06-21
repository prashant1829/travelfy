// src/api/weatherAPI.js
import axios from "axios";

const baseURL = "https://api.openweathermap.org/data/3.0/onecall"; // Version 3.0 API endpoint
const apiKey = process.env.REACT_APP_OPEN_WEATHER_API;

export const getWeatherForecast = async (lat, lon) => {
  try {
    const response = await axios.get(baseURL, {
      params: {
        lat,
        lon,
        exclude: "current,minutely,hourly,alerts", // Exclude unnecessary data
        units: "metric", // Units for temperature (metric for Celsius)
      },
      headers: {
        "x-api-key": apiKey, // API key header for version 3.0
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error; // Throw the error further so it can be handled
  }
};

