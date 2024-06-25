import axios from 'axios';

// Replace with your actual API key
const API_KEY = '9818177461msh4da05e30234fec8p181250jsn9bea6be85df9';
const BASE_URL = 'https://visual-crossing-weather.p.rapidapi.com/forecast';

export const getWeather = async (city, aggregateHours = 24) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        location: city,
        unitGroup: 'metric', // or 'us' for Fahrenheit
        contentType: 'json',
        shortColumnNames: false,
        aggregateHours: aggregateHours, // Adding the aggregateHours parameter
      },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'visual-crossing-weather.p.rapidapi.com',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};


