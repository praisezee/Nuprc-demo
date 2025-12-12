"use client";

import React from "react";
import { FaChartLine } from "react-icons/fa";

export default function NewsTicker() {
	return (
		<div className="bg-gray-100 border-b border-gray-200 py-3 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center">
				{/* Label */}
				<div className="flex-shrink-0 bg-primary/10 text-primary px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider flex items-center mr-4">
					<FaChartLine className="mr-2" />
					Market Watch
				</div>

				{/* Ticker Content */}
				<div className="flex-grow overflow-hidden relative h-6 mask-fade-sides">
					<div className="animate-marquee whitespace-nowrap absolute top-0 left-0 flex items-center space-x-12 text-sm text-gray-700 font-medium">
						<span className="flex items-center">
							<span className="text-primary-600 font-bold mr-2">BRENT CRUDE:</span>{" "}
							$75.42 <span className="text-primary-500 ml-1 text-xs">▲ +1.2%</span>
						</span>
						<span className="flex items-center">
							<span className="text-gray-900 font-bold mr-2">UPDATE:</span> NUPRC
							denies withholding Frontier Exploration Fund
						</span>
						<span className="flex items-center">
							<span className="text-gray-900 font-bold mr-2">NOTICE:</span> 2024
							Licensing Round Registration Closing Soon
						</span>
						<span className="flex items-center">
							<span className="text-primary-600 font-bold mr-2">GAS:</span> $2.85{" "}
							<span className="text-red-500 ml-1 text-xs">▼ -0.5%</span>
						</span>
						{/* Duplicate for seamless loop */}
						<span className="flex items-center">
							<span className="text-primary-600 font-bold mr-2">BRENT CRUDE:</span>{" "}
							$75.42 <span className="text-primary-500 ml-1 text-xs">▲ +1.2%</span>
						</span>
						<span className="flex items-center">
							<span className="text-gray-900 font-bold mr-2">UPDATE:</span> NUPRC
							denies withholding Frontier Exploration Fund
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
