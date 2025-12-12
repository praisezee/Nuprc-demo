import React from "react";
import { FaSpinner } from "react-icons/fa";

export default function Loading() {
	return (
		<div className="flex items-center justify-center min-h-[60vh] w-full">
			<div className="flex flex-col items-center gap-4">
				<FaSpinner className="animate-spin h-12 w-12 text-primary" />
				<p className="text-gray-500 font-medium animate-pulse">
					Loading content...
				</p>
			</div>
		</div>
	);
}
