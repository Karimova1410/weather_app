import React from "react";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);
const ForecastChart = ({ forecast }) => {
	const data = {
		labels: forecast.map(entry => entry.date),
		datasets: [
			{
				label: "Temperature (°C)",
				data: forecast.map(entry => entry.temp), 
				borderColor: "blue",
				borderWidth: 2,
				tension: 0.4,
				fill: false,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			tooltip: {
				callbacks: {
					label: context => `Temperature: ${context.raw}°C`,
				},
			},
		},
		scales: {
			x: {
				title: { display: true, text: "Date" },
			},
			y: {
				title: { display: true, text: "Temperature (°C)" },
				beginAtZero: true,
			},
		},
	};

	return <Line data={data} options={options} />;
};

export default ForecastChart;
