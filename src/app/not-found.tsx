import Link from "next/link";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
			<div className="max-w-md w-full text-center p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
				<div className="h-24 w-24 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
					<FaExclamationTriangle />
				</div>
				<h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
				<h2 className="text-xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
				<p className="text-gray-500 mb-8">
					The page you are looking for might have been removed, had its name changed,
					or is temporarily unavailable.
				</p>
				<Link
					href="/"
					className="inline-flex items-center justify-center w-full py-3 px-6 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-colors shadow-md transform hover:-translate-y-0.5">
					<FaHome className="mr-2" /> Return Home
				</Link>
			</div>
		</div>
	);
}
