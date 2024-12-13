import { useState } from "react";
import axios from "axios";

const API_KEY = "b14288f8865f41268fd3e7cd5e1f17d3";


const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState([]);

  const [error, setError] = useState("");

  const fetchWeather = async cityName => {
    if (!cityName.trim()) {
      setError("City name cannot be empty.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      setWeather({
        city: response.data.name,
        temp: response.data.main.temp,
        feels: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        wind: response.data.wind.speed,
        condition: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
      });
      fetchForecast(response.data.name);

    } catch {
      setError("Unable to fetch weather. Check the city name.");
    } finally {
      setLoading(false);
    }
  };
  const fetchForecast = async cityName => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const dailyForecast = response.data.list
        .filter((_, index) => index % 8 === 0)
        .map(entry => ({
          date: entry.dt_txt.split(" ")[0],
          temp: entry.main.temp,
        }));
      setForecast(dailyForecast);
    } catch {
      setError("Unable to fetch forecast.");
    }
  };

  const fetchWeatherByLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          );
          setWeather({
            city: response.data.name,
            temp: response.data.main.temp,
            feels: response.data.main.feels_like,
            humidity: response.data.main.humidity,
            wind: response.data.wind.speed,
            condition: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
          });
          fetchForecast(response.data.name);
        } catch {
          setError("Unable to fetch weather for your location.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Unable to retrieve your location.");
        setLoading(false);
      }
    );
  };

  return { weather, forecast, loading, error, fetchWeather, fetchWeatherByLocation };
};

export default useWeather;
