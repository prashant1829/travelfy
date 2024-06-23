import axios from "axios";

const openWeatherAPI = '720b2c841284da9af2eba75581838bed';
const baseURL = "https://api.openweathermap.org/data/3.0/onecall?";

export const getWeather = async (lat, lng) => {
  try {
    const { data } = await axios.get(baseURL, {
      params: {
        lat,
        lon: lng,
        exclude: "current,hourly,minutely,alerts",
        units: "metric",
        appid: openWeatherAPI,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};


