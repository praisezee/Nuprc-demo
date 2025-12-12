import Cookies from "js-cookie";
import api from "./api";
import { jwtDecode } from "jwt-decode";

export interface User {
	userId: string;
	email: string;
	role: string;
	firstName: string;
	lastName: string;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export const auth = {
	login: async (credentials: LoginCredentials) => {
		const { data } = await api.post("/auth/login", credentials);
		const { user, tokens } = data;
		const { accessToken, refreshToken } = tokens;

		Cookies.set("accessToken", accessToken);
		Cookies.set("refreshToken", refreshToken);
		Cookies.set("user", JSON.stringify(user));

		return user;
	},

	logout: () => {
		Cookies.remove("accessToken");
		Cookies.remove("refreshToken");
		Cookies.remove("user");
		window.location.href = "/admin/login";
	},

	getUser: (): User | null => {
		const userStr = Cookies.get("user");
		return userStr ? JSON.parse(userStr) : null;
	},

	isAuthenticated: (): boolean => {
		const token = Cookies.get("accessToken");
		return !!token;
	},

	// Helper to check token expiry client-side if needed
	isTokenExpired: (token: string): boolean => {
		try {
			const decoded: { exp: number } = jwtDecode(token);
			return decoded.exp * 1000 < Date.now();
		} catch (e) {
			return true;
		}
	},
};
