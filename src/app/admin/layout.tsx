"use client";

import React, { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import { FaSpinner } from "react-icons/fa";
import FloatingAI from "@/components/ui/FloatingAI";
import { ToastProvider } from "@/context/ToastContext";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkAuth = () => {
			const isAuthenticated = auth.isAuthenticated();
			const isLoginPage = pathname === "/admin/login";

			if (isLoginPage) {
				if (isAuthenticated) {
					// Already logged in, redirect to dashboard
					router.replace("/admin/dashboard");
				} else {
					// Allow access to login page
					setIsLoading(false);
				}
			} else {
				if (!isAuthenticated) {
					// Not logged in, redirect to login
					router.replace("/admin/login");
				} else {
					// Authenticated, allow access
					setIsLoading(false);
				}
			}
		};

		checkAuth();
	}, [pathname, router]);

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center bg-gray-50">
				<FaSpinner className="h-8 w-8 animate-spin text-primary" />
			</div>
		);
	}

	// If on login page, render without sidebar
	if (pathname === "/admin/login") {
		return <>{children}</>;
	}

	// Protected layout with sidebar
	return (
		<ToastProvider>
			<div className="flex h-screen bg-gray-50">
				<AdminSidebar />
				<main className="flex-1 overflow-auto p-8">
					<div className="max-w-7xl mx-auto">{children}</div>
				</main>
				<FloatingAI />
			</div>
		</ToastProvider>
	);
}
