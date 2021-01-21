import { init } from "@rematch/core";
import Common from "./common";
import my from "@/app/my/store";
import my2 from "@/app/my2/store";
const store = init({
	models: {
		Common,
		my,
		my2,
	},
});

export default store;
