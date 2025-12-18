"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SearchInput from "@/components/ui/SearchInput";

export default function NewsDetailSearch() {
	const router = useRouter();

	const handleSearch = (query: string) => {
		if (query.trim()) {
			router.push(`/media/news?q=${encodeURIComponent(query)}`);
		}
	};

	return (
		<div className="w-full max-w-sm">
			<SearchInput
				placeholder="Search all news..."
				onSearch={() => {}} // We only trigger on Enter for redirect
				onEnter={handleSearch}
			/>
		</div>
	);
}
