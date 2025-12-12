"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import { FaLock, FaEnvelope } from "react-icons/fa";

export default function AdminLoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			await auth.login({ email, password });
			router.push("/admin/dashboard");
		} catch (err: any) {
			setError(
				err.response?.data?.message ||
					"Login failed. Please check your credentials."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-primary mb-2">NUPRC Admin</h1>
					<p className="text-gray-600">Secure Access Portal</p>
				</div>

				{error && (
					<div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
						<p className="text-sm">{error}</p>
					</div>
				)}

				<form
					onSubmit={handleSubmit}
					className="space-y-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Email Address
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<FaEnvelope className="text-gray-400" />
							</div>
							<input
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
								placeholder="admin@nuprc.gov.ng"
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Password
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<FaLock className="text-gray-400" />
							</div>
							<input
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
								placeholder="••••••••"
							/>
						</div>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
						{loading ? "Authenticating..." : "Sign In"}
					</button>
				</form>

				<div className="mt-6 text-center text-sm text-gray-500">
					<p>Restricted area. Authorized personnel only.</p>
				</div>
			</div>
		</div>
	);
}
