/** @type {import('tailwindcss').Config} */

export default {
	darkMode: "class",
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#008751", // Nigerian Green
					dark: "#006400",
					light: "#2E9E6D",
					50: "#E6F3EE",
					100: "#C1E1D4",
					200: "#97CEBA",
					300: "#6DBA9F",
					400: "#49A988",
					500: "#008751",
					600: "#006D41",
					700: "#005332",
					800: "#003A23",
					900: "#002013",
				},
				secondary: "#D4AF37", // Gold accent
				accent: "#D4AF37",
			},
		},
	},
	plugins: [],
};
