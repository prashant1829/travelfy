// src/pages/Weather.jsx
import React, { useState, useEffect } from "react";
import { getWeatherForecast } from "../../api/WeatherAPI";
import { SearchBox, WeatherCard, WeatherCardIntro } from "../../components";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const Weather = () => {
  const [coordinates, setCoordinates] = useState({});
  const [weather, setWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getWeatherForecast(coordinates.lat, coordinates.lon);
        setWeather(data.daily);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError(true);
        setIsLoading(false);
      }
    };

    if (coordinates.lat && coordinates.lon) {
      fetchWeatherData();
    }
  }, [coordinates]);

  return (
    <Container maxWidth="lg">
      <Box display="flex" flexDirection="column" alignItems="center">
        <SearchBox setCoordinates={setCoordinates} />
        <Box display="flex" flexWrap="wrap" justifyContent="center" mt={2}>
          {!isLoading && weather.length > 0 ? (
            weather.slice(0, 7).map((day, index) => (
              <WeatherCard key={index} day={day} />
            ))
          ) : (
            <WeatherCardIntro />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Weather;

