import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

interface ConfirmationModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title?: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
	isLoading?: boolean;
	isDelete?: boolean; // If true, main button is red
}

export default function ConfirmationModal({
	isOpen,
	onClose,
	onConfirm,
	title = "Confirm Action",
	message,
	confirmText = "Confirm",
	cancelText = "Cancel",
	isLoading = false,
	isDelete = false,
}: ConfirmationModalProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
			<div
				className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 opacity-100"
				onClick={(e) => e.stopPropagation()}>
				{/* Header */}
				<div className="p-6 pb-0 flex items-center mb-4">
					<div
						className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
							isDelete ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"
						}`}>
						<FaExclamationTriangle className="text-xl" />
					</div>
					<h3 className="text-xl font-bold text-gray-900">{title}</h3>
				</div>

				{/* Body */}
				<div className="px-6 pb-6">
					<p className="text-gray-600 leading-relaxed">{message}</p>
				</div>

				{/* Footer */}
				<div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 flex-wrap">
					<button
						onClick={onClose}
						disabled={isLoading}
						className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors disabled:opacity-50">
						{cancelText}
					</button>
					<button
						onClick={onConfirm}
						disabled={isLoading}
						className={`px-4 py-2 rounded-lg text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 flex items-center ${
							isDelete
								? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
								: "bg-primary hover:bg-primary-dark focus:ring-primary"
						}`}>
						{isLoading && (
							<svg
								className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24">
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
						)}
						{confirmText}
					</button>
				</div>
			</div>
		</div>
	);
}
