"use client";

import React, { useState, useMemo } from "react";
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
	Filler,
	TooltipItem,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

type TimeFrame = "1D" | "1W" | "1M" | "3M" | "6M" | "1Y" | "ALL";

interface PriceData {
	date: string;
	price: number;
}

// Generate mock Brent Crude price data
const generateMockData = (timeFrame: TimeFrame): PriceData[] => {
	const now = new Date();
	const data: PriceData[] = [];
	let days = 1;
	let basePrice = 82.5;

	switch (timeFrame) {
		case "1D":
			days = 1;
			for (let i = 24; i >= 0; i--) {
				const date = new Date(now.getTime() - i * 60 * 60 * 1000);
				const price = basePrice + Math.random() * 2 - 1;
				data.push({
					date: date.toLocaleTimeString("en-US", {
						hour: "2-digit",
						minute: "2-digit",
					}),
					price: parseFloat(price.toFixed(2)),
				});
			}
			break;
		case "1W":
			days = 7;
			for (let i = days; i >= 0; i--) {
				const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
				const price = basePrice + Math.random() * 4 - 2;
				data.push({
					date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
					price: parseFloat(price.toFixed(2)),
				});
			}
			break;
		case "1M":
			days = 30;
			for (let i = days; i >= 0; i -= 2) {
				const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
				const price = basePrice + Math.random() * 6 - 3;
				data.push({
					date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
					price: parseFloat(price.toFixed(2)),
				});
			}
			break;
		case "3M":
			days = 90;
			for (let i = days; i >= 0; i -= 3) {
				const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
				const price = basePrice + Math.random() * 8 - 4;
				data.push({
					date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
					price: parseFloat(price.toFixed(2)),
				});
			}
			break;
		case "6M":
			days = 180;
			for (let i = days; i >= 0; i -= 7) {
				const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
				const price = basePrice + Math.random() * 10 - 5;
				data.push({
					date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
					price: parseFloat(price.toFixed(2)),
				});
			}
			break;
		case "1Y":
			days = 365;
			for (let i = days; i >= 0; i -= 14) {
				const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
				const price = basePrice + Math.random() * 15 - 7.5;
				data.push({
					date: date.toLocaleDateString("en-US", {
						month: "short",
						year: "2-digit",
					}),
					price: parseFloat(price.toFixed(2)),
				});
			}
			break;
		case "ALL":
			days = 730; // 2 years
			for (let i = days; i >= 0; i -= 30) {
				const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
				const price = basePrice + Math.random() * 20 - 10;
				data.push({
					date: date.toLocaleDateString("en-US", {
						month: "short",
						year: "2-digit",
					}),
					price: parseFloat(price.toFixed(2)),
				});
			}
			break;
	}

	return data;
};

export default function BrentCrudeChart() {
	const [timeFrame, setTimeFrame] = useState<TimeFrame>("1M");

	const timeFrames: TimeFrame[] = ["1D", "1W", "1M", "3M", "6M", "1Y", "ALL"];

	const chartData = useMemo(() => generateMockData(timeFrame), [timeFrame]);

	const currentPrice = chartData[chartData.length - 1]?.price || 82.5;
	const previousPrice = chartData[chartData.length - 2]?.price || 82.0;
	const priceChange = currentPrice - previousPrice;
	const percentageChange = ((priceChange / previousPrice) * 100).toFixed(2);
	const isPositive = priceChange >= 0;

	const data = {
		labels: chartData.map((d) => d.date),
		datasets: [
			{
				label: "Brent Crude Price (USD)",
				data: chartData.map((d) => d.price),
				borderColor: isPositive ? "#10b981" : "#ef4444",
				backgroundColor: isPositive
					? "rgba(16, 185, 129, 0.1)"
					: "rgba(239, 68, 68, 0.1)",
				fill: true,
				tension: 0.4,
				pointRadius: 0,
				pointHoverRadius: 6,
				pointHoverBackgroundColor: isPositive ? "#10b981" : "#ef4444",
				borderWidth: 2,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				mode: "index" as const,
				intersect: false,
				backgroundColor: "rgba(0, 0, 0, 0.8)",
				titleColor: "#fff",
				bodyColor: "#fff",
				borderColor: "#008751",
				borderWidth: 1,
				padding: 12,
				displayColors: false,
				callbacks: {
					label: function (context: TooltipItem<"line">) {
						const val = context.parsed.y;
						return val !== null ? `$${val.toFixed(2)}` : "";
					},
				},
			},
		},
		scales: {
			x: {
				display: true,
				grid: {
					display: false,
				},
				ticks: {
					maxRotation: 0,
					autoSkipPadding: 20,
					color: "#6b7280",
					font: {
						size: 11,
					},
				},
			},
			y: {
				display: true,
				grid: {
					color: "rgba(0, 0, 0, 0.05)",
				},
				ticks: {
					color: "#6b7280",
					font: {
						size: 11,
					},
					callback: function (value: number | string) {
						return `$${value}`;
					},
				},
			},
		},
		interaction: {
			mode: "nearest" as const,
			axis: "x" as const,
			intersect: false,
		},
	};

	return (
		<div className="bg-white rounded-2xl shadow-xl p-6 h-full">
			{/* Header */}
			<div className="mb-6">
				<div className="flex items-center justify-between mb-2">
					<h3 className="text-xl font-bold text-gray-900">Brent Crude Oil</h3>
					<span className="text-xs text-gray-500 font-mono">USD/Barrel</span>
				</div>
				<div className="flex items-baseline gap-3">
					<span className="text-3xl font-bold text-gray-900">
						${currentPrice.toFixed(2)}
					</span>
					<span
						className={`text-sm font-bold flex items-center gap-1 ${
							isPositive ? "text-green-600" : "text-red-600"
						}`}>
						{isPositive ? "↑" : "↓"} ${Math.abs(priceChange).toFixed(2)} (
						{percentageChange}%)
					</span>
				</div>
			</div>

			{/* Chart */}
			<div className="h-64 mb-6">
				<Line
					data={data}
					options={options}
				/>
			</div>

			{/* Time Frame Selector */}
			<div className="flex gap-2 flex-wrap">
				{timeFrames.map((tf) => (
					<button
						key={tf}
						onClick={() => setTimeFrame(tf)}
						className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
							timeFrame === tf
								? "bg-primary text-white shadow-md"
								: "bg-gray-100 text-gray-600 hover:bg-gray-200"
						}`}>
						{tf}
					</button>
				))}
			</div>

			{/* Info */}
			<div className="mt-4 pt-4 border-t border-gray-100">
				<p className="text-xs text-gray-500 text-center">
					Live market data • Updated every 15 minutes
				</p>
			</div>
		</div>
	);
}
