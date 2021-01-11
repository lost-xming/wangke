import { GET, POST } from "@/axios";
import CommonService from "@/store/CommonService";
import { apiUrl } from "@/config-url/config";
class Service extends CommonService {
	/**
	 *
	 * @param {跟新数据} params
	 */
	loginAction(params) {
		return POST(`${apiUrl}/login`, params);
	}
}

export default new Service();
