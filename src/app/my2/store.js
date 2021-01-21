import Service from "./Service";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
	state: {
		userInfo: {},
		carList: [
			{
				id: 1,
				name: "1个月",
				month: 1,
				money: 30,
				discount_monty: 25,
				bundle_id: "android.xiaoxiaoshubao",
				product_id: "android.one.month",
				discount_start_time: "2020-01-12 09:55:58",
				discount_end_time: "2020-01-15 09:55:58",
			},
			{
				id: 2,
				name: "3个月",
				month: 3,
				money: 68,
				bundle_id: "android.xiaoxiaoshubao",
				product_id: "android.one.month",
			},
			{
				id: 3,
				name: "6个月",
				month: 6,
				money: 128,
				bundle_id: "android.xiaoxiaoshubao",
				product_id: "android.one.month",
			},
			{
				id: 4,
				name: "12个月",
				month: 12,
				money: 240,
				bundle_id: "android.xiaoxiaoshubao",
				product_id: "android.one.month",
			},
		],
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
