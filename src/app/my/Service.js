import { GET, POST } from "@/axios";
import CommonService from "@/store/CommonService";
import { apiUrl } from "@/config-url/config";
class Service extends CommonService {
	/**
	 *
	 * @param {} params
	 */
	loginAction(params) {
		return POST(`${apiUrl}/www/sms_login_send_sms`, params);
	}
	getLoginSms(params) {
		return POST(`${apiUrl}/www/sms_login_send_sms`, params);
	}
	getList(params) {
		return POST(`${apiUrl}/www/member/get_member_commodity_list`, params);
	}
	getWeiXinPay(params) {
		return POST(`${apiUrl}/www/member/wx_unified_order`, params);
	}
	getZhiFuBaoPay(params) {
		return POST(`${apiUrl}/www/member/wx_unified_order`, params);
	}
}

export default new Service();
