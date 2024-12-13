import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useStyles } from "./WheatherAppStyles";
import InputSection from "./InputSection";
import WeatherCard from "./WeatherCard";
import FavoritesList from "./FavoritesList";
import ForecastChart from "./ForecastChart";
import useWeather from "./../hooks/useWeather";
import useFavorites from "./../hooks/useFavorites";

const WeatherApp = () => {
	const { weather, forecast, loading, error, fetchWeather, fetchWeatherByLocation } = useWeather();
	const { favorites, addToFavorites, loadFavorite, removeFromFavorites } = useFavorites();
	const [city, setCity] = useState("");
	const classes = useStyles;

	return (
		<Box sx={classes.container}>
			<Box sx={classes.cardContainer}>
				<Typography variant='h4' gutterBottom align='center' sx={classes.title}>
					Weather App
				</Typography>

				<InputSection
					city={city}
					setCity={setCity}
					fetchWeather={fetchWeather}
					fetchWeatherByLocation={fetchWeatherByLocation}
					loading={loading}
					error={error}
				/>

				{weather && (
					<WeatherCard
						weather={weather}
						addToFavorites={() => addToFavorites(weather.city)}
					/>
				)}
				{forecast.length > 0 && <ForecastChart forecast={forecast} />}

				<FavoritesList
					favorites={favorites}
					removeFromFavorites={removeFromFavorites}
					loadFavorite={cityName => loadFavorite(cityName, fetchWeather)}
					classes={classes}
				/>
			</Box>
		</Box>
	);
};

export default WeatherApp;
