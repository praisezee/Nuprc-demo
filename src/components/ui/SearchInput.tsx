"use client";

import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchInputProps {
	placeholder?: string;
	onSearch: (value: string) => void;
	onEnter?: (value: string) => void;
	className?: string;
}

export default function SearchInput({
	placeholder = "Search...",
	onSearch,
	onEnter,
	className = "",
}: SearchInputProps) {
	return (
		<div className={`relative group ${className}`}>
			<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
				<FaSearch className="text-gray-400 group-focus-within:text-primary transition-colors" />
			</div>
			<input
				type="text"
				className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none shadow-sm transition-all text-gray-700 placeholder:text-gray-400"
				placeholder={placeholder}
				onChange={(e) => onSearch(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter" && onEnter) {
						onEnter((e.target as HTMLInputElement).value);
					}
				}}
			/>
		</div>
	);
}
