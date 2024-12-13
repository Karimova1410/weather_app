import React from "react";
import {
	TextField,
	Button,
	CircularProgress,
	Typography,
	Box,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const InputSection = ({
	city,
	setCity,
	fetchWeather,
	fetchWeatherByLocation,
	loading,
	error,
}) => {
	const handleKeyPress = e => {
		if (e.key === "Enter") fetchWeather(city);
	};

	return (
		<>
			<TextField
				label='Enter City'
				variant='outlined'
				value={city}
				onChange={e => {
          setCity(e.target.value)}}
				onKeyPress={handleKeyPress}
				fullWidth
				sx={{ marginBottom: "20px" }}
			/>

			<Box sx={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
				<Button
					variant='contained'
					onClick={() => fetchWeather(city)}
					fullWidth>
					Show Weather
				</Button>
				<Button
					variant='contained'
					startIcon={<LocationOnIcon />}
					onClick={fetchWeatherByLocation}
					fullWidth>
					Use Location
				</Button>
			</Box>

			{loading && (
				<Box
					sx={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
					<CircularProgress />
				</Box>
			)}

			{error && (
				<Typography color='error' align='center' sx={{ marginBottom: "10px" }}>
					{error}
				</Typography>
			)}
		</>
	);
};

export default InputSection;
