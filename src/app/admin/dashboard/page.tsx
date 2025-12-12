"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import {
	FaUsers,
	FaNewspaper,
	FaBook,
	FaGavel,
	FaImages,
	FaEnvelope,
	FaSpinner,
} from "react-icons/fa";

interface DashboardStats {
	counts: {
		users: number;
		news: number;
		publications: number;
		regulations: number;
		media: number;
		messages: number;
	};
	recentActivity: any[];
}

export default function DashboardPage() {
	const [stats, setStats] = useState<DashboardStats | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const { data } = await api.get("/dashboard/stats");
				setStats(data.data);
			} catch (err) {
				console.error("Failed to fetch stats:", err);
				setError("Failed to load dashboard statistics.");
			} finally {
				setLoading(false);
			}
		};

		fetchStats();
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<FaSpinner className="animate-spin h-8 w-8 text-primary" />
			</div>
		);
	}

	if (error) {
		return <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>;
	}

	const statCards = [
		{
			label: "Total Users",
			value: stats?.counts.users || 0,
			icon: FaUsers,
			color: "bg-blue-500",
		},
		{
			label: "News Articles",
			value: stats?.counts.news || 0,
			icon: FaNewspaper,
			color: "bg-primary-500",
		},
		{
			label: "Publications",
			value: stats?.counts.publications || 0,
			icon: FaBook,
			color: "bg-yellow-500",
		},
		{
			label: "Regulations",
			value: stats?.counts.regulations || 0,
			icon: FaGavel,
			color: "bg-purple-500",
		},
		{
			label: "Media Items",
			value: stats?.counts.media || 0,
			icon: FaImages,
			color: "bg-pink-500",
		},
		{
			label: "Messages",
			value: stats?.counts.messages || 0,
			icon: FaEnvelope,
			color: "bg-indigo-500",
		},
	];

	return (
		<div>
			<h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
				{statCards.map((card, index) => {
					const Icon = card.icon;
					return (
						<div
							key={index}
							className="bg-white rounded-lg shadow-sm p-6 flex items-center border border-gray-100">
							<div className={`p-4 rounded-full text-white mr-4 ${card.color}`}>
								<Icon className="h-6 w-6" />
							</div>
							<div>
								<p className="text-sm text-gray-500 font-medium">{card.label}</p>
								<p className="text-2xl font-bold text-gray-900">{card.value}</p>
							</div>
						</div>
					);
				})}
			</div>

			{/* Recent Activity Section */}
			<div className="bg-white rounded-lg shadow-sm border border-gray-100">
				<div className="px-6 py-4 border-b border-gray-100">
					<h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
				</div>
				<div className="p-6">
					{stats?.recentActivity && stats.recentActivity.length > 0 ? (
						<ul className="space-y-4">
							{stats.recentActivity.map((activity, index) => (
								<li
									key={index}
									className="flex items-start">
									<div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3" />
									<div>
										<p className="text-sm text-gray-800">{activity.description}</p>
										<p className="text-xs text-gray-500">
											{new Date(activity.createdAt).toLocaleString()}
										</p>
									</div>
								</li>
							))}
						</ul>
					) : (
						<p className="text-gray-500 text-sm italic">
							No recent activity recorded.
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
