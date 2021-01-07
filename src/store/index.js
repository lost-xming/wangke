import { init } from "@rematch/core";
import Common from "./common";
import login from "@/app/login/store";
import loginCom from "@/components/login/store";
const store = init({
	models: {
		Common,
		login,
		loginCom,
	},
});

export default store;
