import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request Interceptor (Add Token)
api.interceptors.request.use(
	(config) => {
		const token = Cookies.get("accessToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Response Interceptor (Handle Errors & Refresh)
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// Handle 401 Unauthorized (Token Expiry)
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const refreshToken = Cookies.get("refreshToken");
				if (!refreshToken) {
					throw new Error("No refresh token");
				}

				// Call refresh endpoint
				const { data } = await axios.post(`${API_URL}/auth/refresh`, {
					refreshToken,
				});

				// Save new tokens
				Cookies.set("accessToken", data.accessToken);
				if (data.refreshToken) {
					Cookies.set("refreshToken", data.refreshToken);
				}

				// Explicitly update the header for the retry
				originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

				// Retry original request
				return api(originalRequest);
			} catch (refreshError) {
				// Refresh failed, logout
				Cookies.remove("accessToken");
				Cookies.remove("refreshToken");
				Cookies.remove("user");
				window.location.href = "/admin/login";
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

import imageCompression from "browser-image-compression";

export const buildDataUrl = ({
	base64,
	mimeType,
}: {
	base64: string;
	mimeType: string;
}) => {
	return `data:${mimeType};base64,${base64}`;
};

/**
 * Compress and upload file to server (Cloudinary)
 * Returns the secure URL
 */
export const uploadFile = async (file: File, folder = "nuprc_general") => {
	// Compression options
	const options = {
		maxSizeMB: 1, // Max 1MB
		maxWidthOrHeight: 1920,
		useWebWorker: true,
	};

	try {
		// Compress if image
		let uploadFile = file;
		if (file.type.startsWith("image/")) {
			try {
				uploadFile = await imageCompression(file, options);
			} catch (err) {
				console.warn("Image compression failed, uploading original:", err);
			}
		}

		// Create FormData
		const formData = new FormData();
		formData.append("file", uploadFile);
		formData.append("folder", folder);

		// Upload
		const { data } = await api.post("/upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return data.data.url;
	} catch (error) {
		console.error("File upload error:", error);
		throw error;
	}
};

export default api;
