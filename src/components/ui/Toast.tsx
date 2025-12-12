"use client";

import React, { useEffect, useState } from "react";
import { useToast, Toast, ToastType } from "@/context/ToastContext";
import {
	FaCheckCircle,
	FaExclamationCircle,
	FaInfoCircle,
	FaTimes,
	FaExclamationTriangle,
} from "react-icons/fa";

const getIcon = (type: ToastType) => {
	switch (type) {
		case "success":
			return <FaCheckCircle className="w-5 h-5" />;
		case "error":
			return <FaExclamationCircle className="w-5 h-5" />;
		case "warning":
			return <FaExclamationTriangle className="w-5 h-5" />;
		default:
			return <FaInfoCircle className="w-5 h-5" />;
	}
};

const getStyles = (type: ToastType) => {
	switch (type) {
		case "success":
			return "bg-green-50 text-green-800 border-green-200";
		case "error":
			return "bg-red-50 text-red-800 border-red-200";
		case "warning":
			return "bg-yellow-50 text-yellow-800 border-yellow-200";
		default:
			return "bg-blue-50 text-blue-800 border-blue-200";
	}
};

const ToastItem: React.FC<{ toast: Toast }> = ({ toast }) => {
	const { removeToast } = useToast();
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Small delay to allow enter animation
		requestAnimationFrame(() => setIsVisible(true));
	}, []);

	const handleClose = () => {
		setIsVisible(false);
		setTimeout(() => removeToast(toast.id), 300); // Wait for exit animation
	};

	return (
		<div
			className={`
        flex items-center w-full max-w-sm p-4 mb-4 rounded-lg shadow-lg border transition-all duration-300 ease-in-out
        ${getStyles(toast.type)}
        ${
									isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
								}
      `}
			role="alert">
			<div className="inline-flex items-center justify-center flex-shrink-0">
				{getIcon(toast.type)}
			</div>
			<div className="ml-3 text-sm font-medium">{toast.message}</div>
			<button
				type="button"
				className="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8 hover:bg-black/5 transition-colors"
				onClick={handleClose}
				aria-label="Close">
				<FaTimes className="w-4 h-4" />
			</button>
		</div>
	);
};

export const ToastContainer: React.FC = () => {
	const { toasts } = useToast();

	return (
		<div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
			{toasts.map((toast) => (
				<ToastItem
					key={toast.id}
					toast={toast}
				/>
			))}
		</div>
	);
};
