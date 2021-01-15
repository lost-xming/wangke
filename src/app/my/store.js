import Service from "./Service";

export default {
	state: {
		userInfo: {},
		carList: [],
		dataSource: [],
	},
	reducers: {
		setStateData(state, data) {
			return { ...state, ...data };
		},
	},
	effects: {
		async loginAction(params) {
			const { data = {} } = await Service.loginAction(params);
			this.setStateData({ userInfo: data });
			localStorage.setItem("userInfo", JSON.stringify(data));
			return data;
		},
		async getLoginSms(params) {
			const { result = {} } = await Service.getLoginSms(params);
			return result;
		},
		async getList(params = {}) {
			const { data = {} } = await Service.getList(params);
			const { list = [] } = data;
			this.setStateData({ carList: list });
			return true;
		},
		async getHostory(params) {
			const { data = {} } = await Service.getHostory(params);
			const { list, total, page } = data;
			this.setStateData({
				dataSource: list,
			});
			return { total, page };
		},

		async getWeiXinPay(params) {
			const { data = {} } = await Service.getWeiXinPay(params);
			const { code_url = "" } = data;
			return code_url;
		},
		async getZhiFuBaoPay(params) {
			const { data = {} } = await Service.getZhiFuBaoPay(params);
			const { code_url = "" } = data;
			return code_url;
		},
	},
};
