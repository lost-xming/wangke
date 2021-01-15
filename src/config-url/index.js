const CONFIG = {
	development: {
		targetUrl: "http://api.smallschoolbag.com",
		apiUrl: "http://api.smallschoolbag.com",
		apiUrlFilter: "/api",
		proxyFilter: "/api",
		autoOpenBrowser: true,
	},
	prodDev: {
		apiUrl: "http://api.smallschoolbag.com",
		apiUrlFilter: "",
	},
	test: {
		apiUrl: "http://api.smallschoolbag.com",
		apiUrlFilter: "",
	},
	production: {
		apiUrl: "http://192.168.3.128:5002",
		apiUrlFilter: "",
	},
};
export default CONFIG;
