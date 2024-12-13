import React from "react";
import {
	Card,
	CardContent,
	Typography,
	Divider,
	Box,
	Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const WeatherCard = ({ weather, addToFavorites }) => {
	return (
		<Card sx={{ marginBottom: "20px", padding: "20px" }}>
			<CardContent sx={{ textAlign: "center" }}>
				<Typography variant='h5'>
					{weather.city}
					<img
						src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
						alt={weather.description}
					/>
				</Typography>
				<Divider sx={{ margin: "10px 0" }} />

				<Typography>Temperature: {weather.temp}°C</Typography>
				<Typography>Feels like: {weather.feels}°C</Typography>
				<Typography>Condition: {weather.condition}</Typography>
				<Typography>Humidity: {weather.humidity}%</Typography>
				<Typography>Wind Speed: {weather.wind} m/s</Typography>

				<Box
					sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
					<Button
						variant='outlined'
						startIcon={<FavoriteIcon />}
						onClick={addToFavorites}>
						Add to Favorites
					</Button>
				</Box>
			</CardContent>
		</Card>
	);
};

export default WeatherCard;
