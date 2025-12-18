"use client";

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingAI from "@/components/ui/FloatingAI";

interface PublicLayoutProps {
	children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
	return (
		<div className="min-h-screen flex flex-col bg-white font-sans text-gray-800">
			<Header />
			<main className="flex-grow pt-[130px] lg:pt-[170px]">{children}</main>
			<Footer />
			<FloatingAI />
		</div>
	);
}
