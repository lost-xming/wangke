import Service from "./Service";

export default {
	state: {
		userInfo: {},
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
	},
};
