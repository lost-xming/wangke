import Home from "@/app/home";
// import PageA from "@/app/pageA";
import NotFound from "@/app/404";
import Login from "@/app/login";
export const appRouters = [
	{
		exact: true,
		path: "/",
		iconType: "BankOutlined",
		hasNotShow: true,
		component: Home,
	},
	// {
	// 	path: "/upload",
	// 	title: "图片上传",
	// 	iconType: "BankOutlined",
	// 	// component: PageA,
	// },
];
export const configRouters = [
	{
		path: "/404",
		title: "404",
		component: NotFound,
	},
	{
		path: "/login",
		title: "login",
		component: Login,
	},
];
