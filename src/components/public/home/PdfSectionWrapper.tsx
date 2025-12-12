"use client";

import dynamic from "next/dynamic";
import React from "react";

const PdfFlipper = dynamic(() => import("@/components/ui/PdfFlipper"), {
	ssr: false,
	loading: () => (
		<div className="h-96 flex justify-center items-center bg-gray-50 text-gray-400">
			Loading PDF Viewer...
		</div>
	),
});

const BrentCrudeChart = dynamic(
	() => import("@/components/public/home/BrentCrudeChart"),
	{
		ssr: false,
		loading: () => (
			<div className="h-96 flex justify-center items-center bg-gray-50 text-gray-400">
				Loading Chart...
			</div>
		),
	}
);

interface PdfSectionWrapperProps {
	file: string;
	title?: string;
}

export default function PdfSectionWrapper({
	file,
	title,
}: PdfSectionWrapperProps) {
	return (
		<section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
			<div className="container mx-auto px-4">
				{/* Header */}
				<div className="text-center mb-12">
					<span className="inline-block py-1 px-3 rounded-full bg-secondary/10 text-secondary border border-secondary/20 text-xs font-bold uppercase tracking-wider mb-4">
						Publications & Market Data
					</span>
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
						Latest Insights & Oil Prices
					</h2>
					<p className="text-gray-500 max-w-2xl mx-auto">
						Read our latest magazine and track real-time Brent Crude oil prices
					</p>
				</div>

				{/* Grid Layout */}
				<div className="grid grid-cols-1 lg:grid-cols-4 w-full gap-8 mx-auto">
					{/* Magazine Section */}
					<div className="bg-white rounded-2xl shadow-xl p-6 col-span-3">
						<h3 className="text-xl font-bold text-gray-900 mb-4">
							{title || "Magazine"}
						</h3>
						<PdfFlipper
							file={file}
							title={title}
							width={350}
							height={495}
							showDownload={false}
						/>
					</div>

					{/* Brent Crude Chart Section */}
					<div className="flex items-stretch">
						<BrentCrudeChart />
					</div>
				</div>
			</div>
		</section>
	);
}
