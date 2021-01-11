import Home from "@/app/home";
import Cooperation from "@/app/cooperation";
import NotFound from "@/app/404";
import My from "@/app/my";
export const appRouters = [
	{
		path: "/",
		exact: true,
		title: "首页",
		redirect: "/home",
		iconType: "BankOutlined",
		component: Home,
	},
	{
		path: "/cooperation",
		title: "申请合作",
		iconType: "BankOutlined",
		component: Cooperation,
	},
	{
		path: "/my",
		title: "学习中心",
		iconType: "BankOutlined",
		component: My,
	},
];
export const configRouters = [
	{
		path: "/404",
		title: "404",
		component: NotFound,
	},
];
