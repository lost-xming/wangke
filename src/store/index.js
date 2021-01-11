import { init } from "@rematch/core";
import Common from "./common";
import my from "@/app/my/store";
const store = init({
	models: {
		Common,
		my,
	},
});

export default store;
