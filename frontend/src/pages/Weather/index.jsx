import "./Weather.css";
import { useState, useEffect } from "react";
import { getWeather } from "../../api/WeatherAPI";
import { WeatherSearchBox, WeatherCard, WeatherCardIntro } from "../../components";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (city) {
      setIsLoading(true);
      getWeather(city)
        .then((data) => {
          setWeather(data.locations[city].values);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(true);
          setIsLoading(false);
        });
    }
  }, [city]);

  return (
    <Container
      maxWidth="lg"
      className="search-weather-container"
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <Box sx={{ display: "grid", width: 700, alignSelf: "center" }}>
        <WeatherSearchBox setCity={setCity} />
      </Box>
      <Box
        sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", mt: 1 }}
        className="weather-card-box"
      >
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching data</p>
        ) : (
          <>
            {weather.length > 0 ? (
              weather.slice(0, 7).map((day, i) => (
                <WeatherCard key={i} day={day} />
              ))
            ) : (
              <WeatherCardIntro />
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default Weather;