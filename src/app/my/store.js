import Service from "./Service";

export default {
	state: {
		userInfo: {},
		carList: [
			{
				id: 1,
				name: "1个月",
				bundle_id: "android.xiaoxiaoshubao",
				product_id: "android.one.month",
				money: 30,
				month: 1,
				discount_monty: 25,
				discount_start_time: "2021-01-12 09:55:38",
				discount_end_time: "2021-02-12 09:55:43",
			},
			{
				id: 2,
				name: "3个月",
				bundle_id: "android.xiaoxiaoshubao",
				product_id: "android.three.month",
				money: 68,
				month: 3,
			},
			{
				id: 3,
				name: "6个月",
				bundle_id: "android.xiaoxiaoshubao",
				product_id: "android.six.month",
				money: 128,
				month: 6,
			},
			{
				id: 4,
				name: "12个月",
				bundle_id: "android.xiaoxiaoshubao",
				product_id: "android.twelve.month",
				money: 228,
				month: 12,
			},
		],
	},
	reducers: {
		setStateData(state, data) {
			return { ...state, ...data };
		},
	},
	effects: {
		async loginAction(params) {
			// const { result = {} } = await Service.loginAction(params);
			// const { data } = result;
			const newData = {
				userName: "吴亦凡",
				timer: "2022-10-20",
			};
			this.setStateData({ userInfo: newData });
			localStorage.setItem("userInfo", JSON.stringify(newData));
			// return data;
		},
		async getLoginSms(params) {
			const { result = {} } = await Service.loginAction(params);
			return result;
		},
		async getList(params = {}) {
			const ajaxData = Object.assign({}, params, {
				token:
					"MTYxMTAxODczNi40ODA1MTc5OjhiYzA3YzExOTE3ODg2YmJmMTVjYTA4N2U0MmU3OWRl",
			});
			const { data = {} } = await Service.getList(ajaxData);
			const { list = [] } = data;
			this.setStateData({ carList: list });
			return true;
		},
		async getWeiXinPay(params) {
			// const { result = {} } = await Service.getWeiXinPay(params);
			// return result;
			return true;
		},
		async getZhiFuBaoPay(params) {
			const { result = {} } = await Service.getZhiFuBaoPay(params);
			return result;
		},
	},
};
