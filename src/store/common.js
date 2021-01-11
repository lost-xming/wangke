import CommonService from "./CommonService";
const CommonServices = new CommonService();
export default {
	state: {
		isAffix: false,
		activeIndex: 0,
	},
	reducers: {
		// setUserInfo(state, data) {
		// 	localStorage.setItem("userInfo", JSON.stringify(data));
		// 	return { ...state, userInfo: data };
		// },
		setStateData(state, data) {
			return { ...state, ...data };
		},
	},
	effects: (dispatch) => ({
		// 此处dispatch 可调用其他组件的 effects  eg： dispatch.count.increment(params);
		// async setUserInfoAction(params, state) {
		// 	// state， 可获取组件state 值
		// 	this.setUserInfo(params);
		// },
		async setAffixData(params) {
			this.setStateData(params);
		},
		async setCommonStateData(params) {
			this.setStateData(params);
		},
	}),
};
