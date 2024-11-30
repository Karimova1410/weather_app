import React, { useState } from "react";
import axios from "axios";
import {
	Button,
	TextField,
	CircularProgress,
	Typography,
	Box,
	List,
	ListItem,
	ListItemText,
	IconButton,
	Card,
	CardContent,
	Divider,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ForecastChart from "./ForecastChart";
import { useStyles } from "./WheatherAppStyles";

const API_KEY = "";

const WeatherApp = () => {
	const [city, setCity] = useState("");
	const [weather, setWeather] = useState(null);
	const [forecast, setForecast] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const classes = useStyles;

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
      console.log(response);
			setWeather({
				city: response.data.name,
				temp: response.data.main.temp,
        feels: response.data.main.feels_like,
				humidity: response.data.main.humidity,
				wind: response.data.wind.speed,
				condition: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
			});
			fetchForecast(cityName);
		} catch (err) {
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

	const addToFavorites = () => {
		if (weather && !favorites.includes(weather.city)) {
			setFavorites([...favorites, weather.city]);
		}
	};

	const loadFavorite = cityName => {
		fetchWeather(cityName);
	};
  const handleKeyPress = e => {
		if (e.key === "Enter") {
			fetchWeather(city);
		}
	};

	return (
		<Box sx={classes.container}>
			<Box sx={classes.cardContainer}>
				<Typography variant='h4' gutterBottom align='center' sx={classes.title}>
					Weather App
				</Typography>

				<TextField
					label='Enter City'
					variant='outlined'
					value={city}
					onChange={e => setCity(e.target.value)}
					onKeyPress={handleKeyPress}
					fullWidth
					sx={classes.inputField}
				/>

				<Box sx={classes.buttonContainer}>
					<Button
						variant='contained'
						onClick={() => fetchWeather(city)}
						fullWidth
						sx={classes.button}>
						Show Weather
					</Button>
					<Button
						variant='contained'
						startIcon={<LocationOnIcon />}
						onClick={fetchWeatherByLocation}
						fullWidth
						sx={classes.button}>
						Use Location
					</Button>
				</Box>

				{loading && (
					<Box sx={classes.loaderContainer}>
						<CircularProgress />
					</Box>
				)}

				{error && (
					<Typography color='error' align='center' sx={classes.errorText}>
						{error}
					</Typography>
				)}

				{weather && (
					<Card sx={classes.card}>
						<CardContent sx={classes.cardContent}>
							<Typography variant='h5' align='top'>
								{weather.city}{" "}
								<img
									src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
									alt={weather.description}
								/>
							</Typography>
							<Divider sx={{ margin: "10px 0" }} />

							<Typography variant='body1' align='center'>
								Temperature: {weather.temp}°C
							</Typography>
							<Typography variant='body1' align='center'>
								Feels like: {weather.feels}°C
							</Typography>
							<Typography variant='body1' align='center'>
								Condition: {weather.condition}
							</Typography>
							<Typography variant='body1' align='center'>
								Humidity: {weather.humidity}%
							</Typography>
							<Typography variant='body1' align='center'>
								Wind Speed: {weather.wind} m/s
							</Typography>
							<Box sx={classes.favoriteButtonContainer}>
								<Button
									variant='outlined'
									startIcon={<FavoriteIcon />}
									onClick={addToFavorites}
									sx={classes.button}>
									Add to Favorites
								</Button>
							</Box>
						</CardContent>
					</Card>
				)}

				{forecast.length > 0 && <ForecastChart forecast={forecast} />}

				<Typography variant='h6' gutterBottom sx={classes.favoriteListTitle}>
					Favorites:
				</Typography>
				<List sx={classes.favoritesList}>
					{favorites.map((fav, index) => (
						<ListItem key={index} sx={classes.favoriteItem}>
							<ListItemText primary={fav} />
							<IconButton onClick={() => loadFavorite(fav)}>
								<FavoriteIcon sx={classes.favoriteIcon} />
							</IconButton>
						</ListItem>
					))}
				</List>
			</Box>
		</Box>
	);
};

export default WeatherApp;
