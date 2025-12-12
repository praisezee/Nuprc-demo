import {
	FaTachometerAlt,
	FaNewspaper,
	FaBook,
	FaGavel,
	FaImages,
	FaLink,
	FaQuestionCircle,
	FaUsers,
	FaUserTie,
	FaCogs,
	FaBullhorn,
} from "react-icons/fa";

export const ADMIN_NAV_ITEMS = [
	{
		label: "Dashboard",
		path: "/admin/dashboard",
		icon: FaTachometerAlt,
	},
	{
		label: "News",
		path: "/admin/news",
		icon: FaNewspaper,
	},
	{
		label: "Publications",
		path: "/admin/publications",
		icon: FaBook,
	},
	{
		label: "Regulations",
		path: "/admin/regulations",
		icon: FaGavel,
	},
	{
		label: "Guidelines",
		path: "/admin/guidelines",
		icon: FaBook,
	},
	{
		label: "Media Gallery",
		path: "/admin/media",
		icon: FaImages,
	},
	{
		label: "Ads",
		path: "/admin/ads",
		icon: FaBullhorn,
	},
	{
		label: "Static Pages",
		path: "/admin/pages",
		icon: FaBook, // Reusing book or maybe file icon
	},
	{
		label: "Portals",
		path: "/admin/portals",
		icon: FaLink,
	},
	{
		label: "FAQ",
		path: "/admin/faq",
		icon: FaQuestionCircle,
	},
	{
		label: "Board Members",
		path: "/admin/board-members",
		icon: FaUserTie,
	},
	{
		label: "Users",
		path: "/admin/users",
		icon: FaUsers,
		role: ["super-admin"], // Example role restriction (to be implemented)
	},
	{
		label: "Settings",
		path: "/admin/settings",
		icon: FaCogs,
	},
];
