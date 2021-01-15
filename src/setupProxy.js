const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (app) => {
	app.use(
		"/api",
		createProxyMiddleware({
			// target: "http://api.smallschoolbag.com",
			target: "http://192.168.3.128:5002",
			changeOrigin: true,
			pathRewrite: {
				"^/api": "/",
			},
		})
	);
};
